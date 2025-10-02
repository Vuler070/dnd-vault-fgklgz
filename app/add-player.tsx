
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { Player, Item } from '@/types/Player';
import { playerManager } from '@/utils/playerManager';

export default function AddPlayerScreen() {
  const [playerData, setPlayerData] = useState({
    name: '',
    class: '',
    level: '1',
    race: '',
    backstory: '',
    currentLocation: '',
    maxHealth: '50',
    currentHealth: '50',
    maxMana: '0',
    currentMana: '0',
  });

  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'misc' as Item['type'],
    description: '',
    quantity: '1',
    rarity: 'common' as Item['rarity'],
  });

  console.log('AddPlayerScreen rendered');

  const handleInputChange = (field: string, value: string) => {
    setPlayerData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemInputChange = (field: string, value: string) => {
    setNewItem(prev => ({ ...prev, [field]: value }));
  };

  const addItem = () => {
    if (!newItem.name.trim()) {
      Alert.alert('Error', 'Item name is required');
      return;
    }

    const item: Item = {
      id: Date.now().toString(),
      name: newItem.name.trim(),
      type: newItem.type,
      description: newItem.description.trim(),
      quantity: parseInt(newItem.quantity) || 1,
      rarity: newItem.rarity,
    };

    setItems(prev => [...prev, item]);
    setNewItem({
      name: '',
      type: 'misc',
      description: '',
      quantity: '1',
      rarity: 'common',
    });
    console.log('Added item:', item);
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    console.log('Removed item with id:', itemId);
  };

  const validateForm = () => {
    if (!playerData.name.trim()) {
      Alert.alert('Error', 'Player name is required');
      return false;
    }
    if (!playerData.class.trim()) {
      Alert.alert('Error', 'Player class is required');
      return false;
    }
    if (!playerData.race.trim()) {
      Alert.alert('Error', 'Player race is required');
      return false;
    }
    if (!playerData.currentLocation.trim()) {
      Alert.alert('Error', 'Current location is required');
      return false;
    }
    return true;
  };

  const savePlayer = () => {
    if (!validateForm()) return;

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: playerData.name.trim(),
      class: playerData.class.trim(),
      level: parseInt(playerData.level) || 1,
      race: playerData.race.trim(),
      backstory: playerData.backstory.trim(),
      currentLocation: playerData.currentLocation.trim(),
      healthPoints: {
        current: parseInt(playerData.currentHealth) || 50,
        max: parseInt(playerData.maxHealth) || 50,
      },
      manaPoints: {
        current: parseInt(playerData.currentMana) || 0,
        max: parseInt(playerData.maxMana) || 0,
      },
      items: items,
    };

    playerManager.addPlayer(newPlayer);
    
    console.log('New player created:', newPlayer);
    Alert.alert('Success', 'Player created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.back()}
      style={styles.headerButton}
    >
      <IconSymbol name="chevron.left" color={colors.primary} size={20} />
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={savePlayer}
      style={styles.headerButton}
    >
      <Text style={styles.saveButtonText}>Save</Text>
    </Pressable>
  );

  const itemTypes: Item['type'][] = ['weapon', 'armor', 'consumable', 'misc'];
  const rarities: Item['rarity'][] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];

  const getRarityColor = (rarity: Item['rarity']) => {
    switch (rarity) {
      case 'common': return '#9E9E9E';
      case 'uncommon': return '#4CAF50';
      case 'rare': return '#2196F3';
      case 'epic': return '#9C27B0';
      case 'legendary': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Add New Player",
            headerLeft: renderHeaderLeft,
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={[commonStyles.wrapper]}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Player Name *</Text>
              <TextInput
                style={styles.input}
                value={playerData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder="Enter player name"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Class *</Text>
                <TextInput
                  style={styles.input}
                  value={playerData.class}
                  onChangeText={(value) => handleInputChange('class', value)}
                  placeholder="Fighter, Wizard, etc."
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Race *</Text>
                <TextInput
                  style={styles.input}
                  value={playerData.race}
                  onChangeText={(value) => handleInputChange('race', value)}
                  placeholder="Human, Elf, etc."
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Level</Text>
              <TextInput
                style={styles.input}
                value={playerData.level}
                onChangeText={(value) => handleInputChange('level', value)}
                placeholder="1"
                keyboardType="numeric"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Location *</Text>
              <TextInput
                style={styles.input}
                value={playerData.currentLocation}
                onChangeText={(value) => handleInputChange('currentLocation', value)}
                placeholder="Where is the player currently?"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Backstory</Text>
            <View style={styles.inputGroup}>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={playerData.backstory}
                onChangeText={(value) => handleInputChange('backstory', value)}
                placeholder="Tell the player's story..."
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Stats</Text>
            
            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Max Health</Text>
                <TextInput
                  style={styles.input}
                  value={playerData.maxHealth}
                  onChangeText={(value) => handleInputChange('maxHealth', value)}
                  placeholder="50"
                  keyboardType="numeric"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Current Health</Text>
                <TextInput
                  style={styles.input}
                  value={playerData.currentHealth}
                  onChangeText={(value) => handleInputChange('currentHealth', value)}
                  placeholder="50"
                  keyboardType="numeric"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Max Mana</Text>
                <TextInput
                  style={styles.input}
                  value={playerData.maxMana}
                  onChangeText={(value) => handleInputChange('maxMana', value)}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Current Mana</Text>
                <TextInput
                  style={styles.input}
                  value={playerData.currentMana}
                  onChangeText={(value) => handleInputChange('currentMana', value)}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items & Inventory</Text>
            
            <View style={styles.addItemContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput
                  style={styles.input}
                  value={newItem.name}
                  onChangeText={(value) => handleItemInputChange('name', value)}
                  placeholder="Enter item name"
                  placeholderTextColor={colors.textSecondary}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Type</Text>
                  <View style={styles.pickerContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {itemTypes.map((type) => (
                        <Pressable
                          key={type}
                          style={[
                            styles.pickerOption,
                            newItem.type === type && styles.pickerOptionSelected
                          ]}
                          onPress={() => handleItemInputChange('type', type)}
                        >
                          <Text style={[
                            styles.pickerOptionText,
                            newItem.type === type && styles.pickerOptionTextSelected
                          ]}>
                            {type}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Quantity</Text>
                  <TextInput
                    style={styles.input}
                    value={newItem.quantity}
                    onChangeText={(value) => handleItemInputChange('quantity', value)}
                    placeholder="1"
                    keyboardType="numeric"
                    placeholderTextColor={colors.textSecondary}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Rarity</Text>
                <View style={styles.pickerContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {rarities.map((rarity) => (
                      <Pressable
                        key={rarity}
                        style={[
                          styles.pickerOption,
                          newItem.rarity === rarity && styles.pickerOptionSelected,
                          { borderColor: getRarityColor(rarity) }
                        ]}
                        onPress={() => handleItemInputChange('rarity', rarity)}
                      >
                        <Text style={[
                          styles.pickerOptionText,
                          newItem.rarity === rarity && styles.pickerOptionTextSelected,
                          { color: getRarityColor(rarity) }
                        ]}>
                          {rarity}
                        </Text>
                      </Pressable>
                    ))}
                  </ScrollView>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newItem.description}
                  onChangeText={(value) => handleItemInputChange('description', value)}
                  placeholder="Describe the item..."
                  placeholderTextColor={colors.textSecondary}
                  multiline
                  numberOfLines={2}
                  textAlignVertical="top"
                />
              </View>

              <Pressable style={styles.addButton} onPress={addItem}>
                <IconSymbol name="plus" color={colors.card} size={16} />
                <Text style={styles.addButtonText}>Add Item</Text>
              </Pressable>
            </View>

            {items.length > 0 && (
              <View style={styles.itemsList}>
                <Text style={styles.itemsListTitle}>Added Items ({items.length})</Text>
                {items.map((item) => (
                  <View key={item.id} style={styles.itemCard}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemDetails}>
                        {item.type} • {item.quantity}x • {item.rarity}
                      </Text>
                      {item.description && (
                        <Text style={styles.itemDescription}>{item.description}</Text>
                      )}
                    </View>
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                    >
                      <IconSymbol name="trash" color={colors.textSecondary} size={16} />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  addItemContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.accent,
    marginBottom: 16,
  },
  pickerContainer: {
    marginTop: 4,
  },
  pickerOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.accent,
    marginRight: 8,
    backgroundColor: colors.background,
  },
  pickerOptionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pickerOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
    textTransform: 'capitalize',
  },
  pickerOptionTextSelected: {
    color: colors.card,
  },
  addButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  itemsList: {
    marginTop: 8,
  },
  itemsListTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  itemCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: colors.highlight,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  itemDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  removeButton: {
    padding: 4,
    marginLeft: 8,
  },
  bottomPadding: {
    height: 100,
  },
});
