import {TouchableOpacity, FlatList, Text, View} from 'react-native';
import {BlueText, Container, ContainerFlatList} from './style';
import CryptoItem from '../../components/cryptoItem/Index';
import React, {useEffect} from 'react';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import Header from '../../components/header/Index';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/index';
import {updateCrypto} from '../../store/reducer/RootReducer';
import { ProfileScreenNavigationProp, RootStackScreenProps } from '../../interfaces/Index';


const CryptoList = () => {
  const { navigate } = useNavigation<ProfileScreenNavigationProp<'CryptoList'>>();
  const dispatch = useDispatch<AppDispatch>();

  const cryptos = useSelector(
    (state: RootState) => state.selectedCrypto.cryptos,
  );

  useEffect(() => {
    const time = setInterval(() => {
      dispatch(updateCrypto(cryptos.map(c => c.slug)));
    }, 9000); 
    return () => clearInterval(time);
  }); 


  return (
    <Container >
      <Header />
      <ContainerFlatList>

            <FlatList
              data={cryptos}
              keyExtractor={item => item?.id}
              renderItem={({item}) => <CryptoItem crypto={item} />}
              ListFooterComponent={
                <TouchableOpacity onPress={() => navigate('AddCrypto')}>
                  <BlueText>+ Add a Cryptocurrency</BlueText>
                </TouchableOpacity>
              }
            />
      </ContainerFlatList>
    </Container>
  );
};

export default CryptoList;
