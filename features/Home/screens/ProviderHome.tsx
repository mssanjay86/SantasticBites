import { ScrollView, StyleSheet, View } from 'react-native';
import { GlobalLayout } from '../../../common/components/GlobalLayout';
import MobileHeader from '../../../common/components/MobileHeader';
import HomeHeader from '../components/HomeHeader';
import { Insights } from '../components/Insights';
import { ProviderFoodsList } from '../components/ProviderFoodsList';
import { ProviderBottomNav } from '../components/ProviderBottomNav';

export const ProviderHome = () => {
  return (
    <GlobalLayout>
      <View style={styles.container}>
        <MobileHeader title="Home" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <HomeHeader />
          <Insights />
          <ProviderFoodsList />
        </ScrollView>
        <ProviderBottomNav activeTab="home" />
      </View>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 56,
  },
  scrollContent: {
    paddingBottom: 96,
  },
});
