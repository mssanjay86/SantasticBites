import { Text, View } from 'react-native';
import { GlobalLayout } from '../../../common/components/GlobalLayout';
import MobileHeader from '../../../common/components/MobileHeader';
import HomeHeader from '../components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '../components/SearchBar';
import { FoodCategories } from '../components/FoodCategories';
import { COLORS } from '../../../common/styles/colors';

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <GlobalLayout>
      {/* override centering for this screen */}
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <MobileHeader title="Home" onBack={() => navigation.goBack()} />
        <HomeHeader />
        {/* normal flow: search bar beneath the header */}
        <SearchBar />
        <FoodCategories />
        <View style={{ marginTop: 24 }}>
          <Text style={{ color: COLORS.text, fontSize: 24, textAlign: 'center' }}>
            Welcome to Santastic Bites!
          </Text>
        </View>
      </View>
    </GlobalLayout>
  );
};
