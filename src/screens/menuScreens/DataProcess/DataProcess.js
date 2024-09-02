import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//função da tela de Login
export const handleLogin = (email, Password, navigation) => {
    //Verifica caso os campos estejam vazios
    if (email === "") {
        Alert.alert("Insira seu email de Usuario!");
    } else if (Password === "") {
        Alert.alert("Insira sua Senha!");
    } else {
        auth().signInWithEmailAndPassword(email, Password)
            //Caso o Login e a senha estejam corretos
            .then(() => {
                console.log('Usuário logado com sucesso! ');
                navigation.navigate("Menu");
            })
            //Caso estejam errados ou tenha alguma falha
            .catch((error) => {
                console.log(error);
                Alert.alert('Usuario e/ou senha invalido!!')
            });
    }
}
// Função Para consultar o local
export async function ConsLocal(local, navigation = null) {
    try {
        const querySnapshot = await firestore()
            .collection('Estoque')
            .doc(local)
            .collection('itens')
            .get();

        if (!querySnapshot.empty) {
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log(data);

            // Se `navigation` estiver disponível, navega para "TelaLocal"
            if (navigation) {
                navigation.navigate("TelaLocal", { local: local, data: data });
            }

            return data; // Retorna os dados obtidos do banco.
        } else {
            console.log('Nenhum item encontrado na subcoleção');
            Alert.alert('Local inválido');
            return [];
        }
    } catch (error) {
        console.error('Erro ao buscar dados do Firestore: ', error);
        Alert.alert('Erro ao consultar local');
        return [];
    }
}
//função da tela de armazenagem
export async function transferirDados(localOrigem, localDestino, ean = null, setLocalData, navigation = null) {
    if (localOrigem === '' || localDestino === '') {
        Alert.alert('Preencha todos os campos!');
        return;
    }

    try {
        // Valida os locais
        const localDataOrg = await firestore().collection('Estoque').doc(localOrigem).get();
        const localDataDes = await firestore().collection('Estoque').doc(localDestino).get();

        if (!localDataOrg.exists || !localDataDes.exists) {
            Alert.alert('Local inválido!');
            return;
        }

        if (localOrigem === localDestino) {
            Alert.alert('O local não pode ser o mesmo!');
            return;
        }

        if (navigation) {
            navigation.navigate("Transferencia", { local1: localOrigem, local2: localDestino });
        }

        if (!ean) return; // Se o EAN não for fornecido, a navegação foi concluída aqui.

        // Pega os dados do local de origem
        const documentoOrigem = await firestore()
            .collection('Estoque')
            .doc(localOrigem)
            .collection('itens')
            .doc(ean)
            .get();

        if (documentoOrigem.exists) {
            const dadosOrigem = documentoOrigem.data();

            // Atualiza o estado localmente
            setLocalData(prevData => [
                ...prevData,
                { id: ean, ...dadosOrigem },
            ]);

            // Verifica se o EAN já existe no local de destino
            const documentoDestino = await firestore()
                .collection('Estoque')
                .doc(localDestino)
                .collection('itens')
                .doc(ean)
                .get();

            if (documentoDestino.exists) {
                // Se o EAN já existe no local de destino, incrementa o volume
                await firestore()
                    .collection('Estoque')
                    .doc(localDestino)
                    .collection('itens')
                    .doc(ean)
                    .update({
                        volume: firestore.FieldValue.increment(1) // Incrementa o volume em 1 no destino
                    });
            } else {
                // Se o EAN não existe no destino, cria um novo documento com volume inicial
                await firestore()
                    .collection('Estoque')
                    .doc(localDestino)
                    .collection('itens')
                    .doc(ean)
                    .set({
                        ...dadosOrigem,
                        volume: 1 // Define o volume inicial como 1
                    });
            }

            console.log('Dados transferidos com sucesso!');

            // Atualiza o volume do local de origem
            const origemRef = firestore()
                .collection('Estoque')
                .doc(localOrigem)
                .collection('itens')
                .doc(ean);

            await origemRef.update({
                volume: firestore.FieldValue.increment(-1) // Decrementa o volume em 1 na origem
            });

            // Pega o volume atualizado após o decremento
            const documentoOrigemAtualizado = await origemRef.get();
            const novoVolume = documentoOrigemAtualizado.data().volume;

            // Se o volume for zero, deleta o documento
            if (novoVolume <= 0) {
                await origemRef.delete();
                console.log('Documento de origem deletado porque o volume chegou a zero ou ficou negativo!');
            } else {
                console.log('Documento de origem atualizado com sucesso!');
            }

        } else {
            Alert.alert('EAN não está no Local');
        }
    } catch (error) {
        console.error('Erro ao transferir os dados:', error);
        Alert.alert('Erro ao transferir os dados');
    }
}