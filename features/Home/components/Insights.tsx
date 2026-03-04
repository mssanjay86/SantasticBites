import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';
import { BadgeCheck, IndianRupee, Package, UtensilsCrossed } from 'lucide-react-native';
import { COLORS } from '../../../common/styles/colors';
import { SPACING } from '../../../common/styles/spacing';

type InsightTone = 'primary' | 'accent' | 'neutral' | 'dark';

interface InsightItem {
  id: string;
  value: string;
  label: string;
  tone: InsightTone;
}

const insights: InsightItem[] = [
  { id: 'foods', value: '10', label: 'Total Foods', tone: 'primary' },
  { id: 'available', value: '5', label: 'Available', tone: 'accent' },
  { id: 'orders', value: '3', label: "Today's Orders", tone: 'neutral' },
  { id: 'earnings', value: '\u20B9 1,200', label: "Today's Earnings", tone: 'dark' },
];

const renderInsightIcon = (id: string) => {
  const iconProps = { size: 18, color: COLORS.text, strokeWidth: 2 };
  switch (id) {
    case 'foods':
      return <UtensilsCrossed {...iconProps} />;
    case 'available':
      return <BadgeCheck {...iconProps} />;
    case 'orders':
      return <Package {...iconProps} />;
    case 'earnings':
      return <IndianRupee {...iconProps} />;
    default:
      return <Package {...iconProps} />;
  }
};

export const Insights = () => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Insights</Text>
        <Text style={styles.sectionSubtitle}>Today at a glance</Text>
      </View> */}

      <View style={styles.grid}>
        {insights.map(item => (
          <View key={item.id} style={[styles.card, toneStyles[item.tone].card]}>
            <View style={styles.cardTopRow}>
              <View style={[styles.iconWrap, toneStyles[item.tone].iconWrap]}>
                {renderInsightIcon(item.id)}
              </View>
              <View style={[styles.pill, toneStyles[item.tone].pill]}>
                <Text style={styles.pillText}>Live</Text>
              </View>
            </View>

            <Text style={[styles.value, toneStyles[item.tone].value]}>{item.value}</Text>
            <Text style={styles.label}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
  },
  sectionHeader: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  sectionSubtitle: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 18,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.4,
  },
  value: {
    marginTop: SPACING.md,
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.text,
  },
  label: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});

interface ToneStyleSet {
  card: ViewStyle;
  iconWrap: ViewStyle;
  value: TextStyle;
  pill: ViewStyle;
}

const toneStyles: Record<InsightTone, ToneStyleSet> = {
  primary: {
    card: {
      backgroundColor: '#FFF2EB',
      borderColor: '#FFD5BF',
    },
    iconWrap: {
      backgroundColor: '#FFE1D1',
    },
    value: {
      color: '#B23806',
    },
    pill: {
      backgroundColor: '#FFDCC8',
    },
  },
  accent: {
    card: {
      backgroundColor: '#FFF8E8',
      borderColor: '#FFE2AB',
    },
    iconWrap: {
      backgroundColor: '#FFEEC8',
    },
    value: {
      color: '#A86A00',
    },
    pill: {
      backgroundColor: '#FFE7B6',
    },
  },
  neutral: {
    card: {
      backgroundColor: '#F5F8FB',
      borderColor: '#D9E2EC',
    },
    iconWrap: {
      backgroundColor: '#E8EEF5',
    },
    value: {
      color: '#27435C',
    },
    pill: {
      backgroundColor: '#DFEAF5',
    },
  },
  dark: {
    card: {
      backgroundColor: '#EAFBF3',
      borderColor: '#BFEAD1',
    },
    iconWrap: {
      backgroundColor: '#D4F4E2',
    },
    value: {
      color: '#1F7A4D',
    },
    pill: {
      backgroundColor: '#C8EFD8',
    },
  },
};
