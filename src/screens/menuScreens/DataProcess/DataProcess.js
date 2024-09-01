import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
// Função combinada para consultar o local e navegar
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

            // Transfere os dados no banco
            await firestore()
                .collection('Estoque')
                .doc(localDestino)
                .collection('itens')
                .doc(ean)
                .set(dadosOrigem);

            console.log('Dados transferidos com sucesso!');

            // Deleta os dados do documento de origem
            await firestore()
                .collection('Estoque')
                .doc(localOrigem)
                .collection('itens')
                .doc(ean)
                .delete();

            console.log('Documento de origem deletado com sucesso!');
        } else {
            Alert.alert('EAN não está no Local');
        }
    } catch (error) {
        console.error('Erro ao transferir os dados:', error);
        Alert.alert('Erro ao transferir os dados');
    }
}