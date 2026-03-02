import { ScrollView, Text, View } from 'react-native';
import { GlobalLayout } from '../../../common/components/GlobalLayout';
import MobileHeader from '../../../common/components/MobileHeader';
import HomeHeader from '../components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from '../components/SearchBar';
import { FoodCategories } from '../components/FoodCategories';
import { FoodCard } from '../components/FoodCard';import { SPACING } from '../../../common/styles/spacing';import { COLORS } from '../../../common/styles/colors';

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
        {/* sample food cards grid: each row scrollable */}
        <View style={{ marginTop: SPACING.md }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: SPACING.md }}
          >
            <FoodCard
              image={require('../../../common/images/welcome-image.png')}
              name="Spicy Noodles"
              price="12.99"
            />
            <FoodCard
              image={require('../../../common/images/welcome-image.png')}
              name="Veg Salad"
              price="8.50"
            />
            <FoodCard
              image={require('../../../common/images/welcome-image.png')}
              name="Chicken Curry"
              price="15.00"
            />
            <FoodCard
              image={require('../../../common/images/welcome-image.png')}
              name="Fruit Bowl"
              price="6.25"
            />
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: SPACING.md, marginTop: SPACING.md }}
          >
            <FoodCard
              image={require('../../../common/images/welcome-image.png')}
              name="Spicy Noodles"
              price="12.99"
            />
            <FoodCard
              image={require('../../../common/images/welcome-image.png')}
              name="Veg Salad"
              price="8.50"
            />
            <FoodCard
              image={require('../../../common/images/welcome-image.png')}
              name="Chicken Curry"
              price="15.00"
            />
            <FoodCard
              image={require('../../../common/images/welcome-image.png')}
              name="Fruit Bowl"
              price="6.25"
            />
          </ScrollView>
        </View>
        
      </View>
    </GlobalLayout>
  );
};
