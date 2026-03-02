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

  // data array for food cards
  const foodItems = [
    { id: 1, image: require('../../../common/images/welcome-image.png'), name: 'Spicy Noodles', price: 12.99 },
    { id: 2, image: require('../../../common/images/welcome-image.png'), name: 'Veg Salad', price: 8.5 },
    { id: 3, image: require('../../../common/images/welcome-image.png'), name: 'Chicken Curry', price: 15.0 },
    { id: 4, image: require('../../../common/images/welcome-image.png'), name: 'Fruit Bowl', price: 6.25 },
    { id: 5, image: require('../../../common/images/welcome-image.png'), name: 'Spicy Noodles', price: 12.99 },
    { id: 6, image: require('../../../common/images/welcome-image.png'), name: 'Veg Salad', price: 8.5 },
    { id: 7, image: require('../../../common/images/welcome-image.png'), name: 'Chicken Curry', price: 15.0 },
    { id: 8, image: require('../../../common/images/welcome-image.png'), name: 'Fruit Bowl', price: 6.25 },
  ];

  // split into chunks of 4
  const rows: Array<typeof foodItems> = [];
  for (let i = 0; i < foodItems.length; i += 4) {
    rows.push(foodItems.slice(i, i + 4));
  }

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
          {rows.map((row, rowIndex) => (
            <ScrollView
              horizontal
              key={rowIndex}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: SPACING.md,
                marginTop: rowIndex > 0 ? SPACING.md : 0,
              }}
            >
              {row.map(item => (
                <FoodCard
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </ScrollView>
          ))}
        </View>
      </View>
    </GlobalLayout>
  );
};
