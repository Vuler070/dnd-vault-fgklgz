
import React from "react";
import { ScrollView, View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { samplePlayers } from "@/data/samplePlayers";
import { Player, Item } from "@/types/Player";

export default function PlayerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const player = samplePlayers.find(p => p.id === id);

  console.log('PlayerDetailScreen rendered for player ID:', id);

  if (!player) {
    return (
      <View style={[commonStyles.container]}>
        <Text style={styles.errorText}>Player not found</Text>
      </View>
    );
  }

  const getHealthPercentage = () => {
    return (player.healthPoints.current / player.healthPoints.max) * 100;
  };

  const getManaPercentage = () => {
    if (player.manaPoints.max === 0) return 0;
    return (player.manaPoints.current / player.manaPoints.max) * 100;
  };

  const getHealthColor = (percentage: number) => {
    if (percentage > 70) return '#4CAF50';
    if (percentage > 30) return '#FF9800';
    return '#F44336';
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#9E9E9E';
      case 'uncommon': return '#4CAF50';
      case 'rare': return '#2196F3';
      case 'epic': return '#9C27B0';
      case 'legendary': return '#FF9800';
      default: return colors.textSecondary;
    }
  };

  const renderItem = (item: Item) => (
    <View key={item.id} style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={[styles.itemName, { color: getRarityColor(item.rarity) }]}>
          {item.name}
        </Text>
        {item.quantity > 1 && (
          <Text style={styles.itemQuantity}>x{item.quantity}</Text>
        )}
      </View>
      <Text style={styles.itemType}>{item.type.toUpperCase()}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.back()}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="chevron.left" color={colors.primary} size={20} />
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Edit player pressed')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="pencil" color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: player.name,
            headerLeft: renderHeaderLeft,
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={[commonStyles.wrapper]}>
        <ScrollView 
          style={styles.container}
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Character Header */}
          <View style={styles.characterHeader}>
            <Text style={styles.characterName}>{player.name}</Text>
            <Text style={styles.characterClass}>
              Level {player.level} {player.race} {player.class}
            </Text>
            <Text style={styles.currentLocation}>
              📍 Currently in {player.currentLocation}
            </Text>
          </View>

          {/* Stats Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Health & Mana</Text>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Health Points</Text>
                <View style={styles.statBarContainer}>
                  <View style={styles.statBar}>
                    <View 
                      style={[
                        styles.statFill, 
                        { 
                          width: `${getHealthPercentage()}%`,
                          backgroundColor: getHealthColor(getHealthPercentage())
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.statValue}>
                    {player.healthPoints.current} / {player.healthPoints.max}
                  </Text>
                </View>
              </View>

              {player.manaPoints.max > 0 && (
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Mana Points</Text>
                  <View style={styles.statBarContainer}>
                    <View style={styles.statBar}>
                      <View 
                        style={[
                          styles.statFill, 
                          { 
                            width: `${getManaPercentage()}%`,
                            backgroundColor: '#2196F3'
                          }
                        ]} 
                      />
                    </View>
                    <Text style={styles.statValue}>
                      {player.manaPoints.current} / {player.manaPoints.max}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Backstory Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Backstory</Text>
            <View style={styles.backstoryCard}>
              <Text style={styles.backstoryText}>{player.backstory}</Text>
            </View>
          </View>

          {/* Inventory Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Inventory ({player.items.reduce((total, item) => total + item.quantity, 0)} items)
            </Text>
            <View style={styles.inventoryContainer}>
              {player.items.map(renderItem)}
            </View>
          </View>
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
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  characterHeader: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 20,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  characterName: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  characterClass: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  currentLocation: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  statsContainer: {
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  statBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statBar: {
    flex: 1,
    height: 12,
    backgroundColor: colors.highlight,
    borderRadius: 6,
    overflow: 'hidden',
  },
  statFill: {
    height: '100%',
    borderRadius: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    minWidth: 60,
    textAlign: 'right',
  },
  backstoryCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  backstoryText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  inventoryContainer: {
    gap: 12,
  },
  itemCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    backgroundColor: colors.highlight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemType: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  itemDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.text,
  },
  errorText: {
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
  },
  headerButtonContainer: {
    padding: 6,
  },
});
