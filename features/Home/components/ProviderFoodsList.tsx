import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Modal, TextInput } from 'react-native';
import { X } from 'lucide-react-native';
import { COLORS } from '../../../common/styles/colors';
import { SPACING } from '../../../common/styles/spacing';

interface ProviderFood {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: 'Veg' | 'Non-Veg';
  available: boolean;
}

const initialFoods: ProviderFood[] = [
  { id: '1', name: 'Chicken Biryani', price: 180, category: 'Non-Veg', available: true },
  { id: '2', name: 'Paneer Butter Masala', price: 160, category: 'Veg', available: true },
  { id: '3', name: 'Egg Fried Rice', price: 140, category: 'Non-Veg', available: false },
];

export const ProviderFoodsList = () => {
  const [foods, setFoods] = useState<ProviderFood[]>(initialFoods);
  const [isAddFoodModalVisible, setIsAddFoodModalVisible] = useState(false);
  const [editingFoodId, setEditingFoodId] = useState<string | null>(null);
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'Veg' | 'Non-Veg'>('Veg');
  const [availability, setAvailability] = useState(true);

  const cardSubtitle = useMemo(
    () => (food: ProviderFood) => `\u20B9${food.price} | ${food.category}`,
    [],
  );

  const toggleAvailability = (id: string, value: boolean) => {
    setFoods(prev => prev.map(food => (food.id === id ? { ...food, available: value } : food)));
  };

  const resetForm = () => {
    setFoodName('');
    setDescription('');
    setPrice('');
    setCategory('Veg');
    setAvailability(true);
  };

  const openAddFoodModal = () => {
    setEditingFoodId(null);
    resetForm();
    setIsAddFoodModalVisible(true);
  };

  const openEditFoodModal = (food: ProviderFood) => {
    setEditingFoodId(food.id);
    setFoodName(food.name);
    setDescription(food.description ?? '');
    setPrice(String(food.price));
    setCategory(food.category);
    setAvailability(food.available);
    setIsAddFoodModalVisible(true);
  };

  const handleSubmitFood = () => {
    const parsedPrice = Number(price);
    if (!foodName.trim() || Number.isNaN(parsedPrice)) {
      return;
    }

    const formFood: ProviderFood = {
      id: editingFoodId ?? String(Date.now()),
      name: foodName.trim(),
      description: description.trim(),
      price: parsedPrice,
      category,
      available: availability,
    };

    if (editingFoodId) {
      setFoods(prev => prev.map(food => (food.id === editingFoodId ? formFood : food)));
    } else {
      setFoods(prev => [formFood, ...prev]);
    }

    resetForm();
    setEditingFoodId(null);
    setIsAddFoodModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.title}>Available Foods</Text>
          <Text style={styles.subtitle}>Manage menu status quickly</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.addButton}
          onPress={openAddFoodModal}
        >
          <Text style={styles.addButtonText}>+ Add Food</Text>
        </TouchableOpacity>
      </View>

      {foods.map(food => (
        <View key={food.id} style={styles.card}>
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.foodMeta}>{cardSubtitle(food)}</Text>

          <View style={styles.actionsRow}>
            <View style={styles.toggleWrap}>
              <Text style={styles.toggleLabel}>Available</Text>
              <Switch
                value={food.available}
                onValueChange={value => toggleAvailability(food.id, value)}
                thumbColor={food.available ? '#FFFFFF' : '#F2F2F2'}
                trackColor={{ false: '#D0D6DC', true: '#FFB08A' }}
              />
            </View>

            <View style={styles.buttonsWrap}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.button, styles.editButton]}
                onPress={() => openEditFoodModal(food)}
              >
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} style={[styles.button, styles.deleteButton]}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      <Modal
        visible={isAddFoodModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsAddFoodModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{editingFoodId ? 'Edit Food' : 'Add Food'}</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.closeButton}
                onPress={() => {
                  resetForm();
                  setEditingFoodId(null);
                  setIsAddFoodModalVisible(false);
                }}
              >
                <X size={18} color={COLORS.text} strokeWidth={2.2} />
              </TouchableOpacity>
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Food Name</Text>
              <TextInput
                style={styles.input}
                value={foodName}
                onChangeText={setFoodName}
                placeholder="Enter food name"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.inputMultiline]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Price</Text>
              <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Category</Text>
              <View style={styles.categoryRow}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[styles.categoryChip, category === 'Veg' && styles.categoryChipActive]}
                  onPress={() => setCategory('Veg')}
                >
                  <Text style={[styles.categoryChipText, category === 'Veg' && styles.categoryChipTextActive]}>
                    Veg
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[styles.categoryChip, category === 'Non-Veg' && styles.categoryChipActive]}
                  onPress={() => setCategory('Non-Veg')}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      category === 'Non-Veg' && styles.categoryChipTextActive,
                    ]}
                  >
                    Non-Veg
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.availabilityRow}>
              <Text style={styles.fieldLabel}>Availability</Text>
              <View style={styles.toggleWrap}>
                <Text style={styles.toggleLabel}>{availability ? 'Yes' : 'No'}</Text>
                <Switch
                  value={availability}
                  onValueChange={setAvailability}
                  thumbColor={availability ? '#FFFFFF' : '#F2F2F2'}
                  trackColor={{ false: '#D0D6DC', true: '#FFB08A' }}
                />
              </View>
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity activeOpacity={0.85} style={styles.resetBtn} onPress={resetForm}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} style={styles.submitBtn} onPress={handleSubmitFood}>
                <Text style={styles.submitBtnText}>{editingFoodId ? 'Update' : 'Submit'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  sectionHeader: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: COLORS.primary,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FFE0D0',
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  foodName: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  foodMeta: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  actionsRow: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    marginRight: SPACING.sm,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  buttonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  editButton: {
    borderColor: '#FFC8AD',
    backgroundColor: '#FFF2EB',
    marginRight: 8,
  },
  deleteButton: {
    borderColor: '#F3B7B7',
    backgroundColor: '#FFF1F1',
  },
  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A24A1A',
  },
  deleteText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B63838',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: SPACING.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  formField: {
    marginBottom: SPACING.sm,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: '#FFFFFF',
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoryRow: {
    flexDirection: 'row',
  },
  categoryChip: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: SPACING.sm,
    backgroundColor: '#FFFFFF',
  },
  categoryChipActive: {
    borderColor: '#FFB08A',
    backgroundColor: '#FFF2EB',
  },
  categoryChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: COLORS.primary,
  },
  availabilityRow: {
    marginTop: SPACING.xs,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  resetBtn: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginRight: SPACING.sm,
    backgroundColor: '#FFFFFF',
  },
  resetBtnText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  submitBtn: {
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
