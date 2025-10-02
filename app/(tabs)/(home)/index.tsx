
import React from "react";
import { Stack, Link } from "expo-router";
import { ScrollView, Pressable, StyleSheet, View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { samplePlayers } from "@/data/samplePlayers";
import { Player } from "@/types/Player";

export default function HomeScreen() {
  console.log('HomeScreen rendered with', samplePlayers.length, 'players');

  const getHealthPercentage = (player: Player) => {
    return (player.healthPoints.current / player.healthPoints.max) * 100;
  };

  const getManaPercentage = (player: Player) => {
    if (player.manaPoints.max === 0) return 0;
    return (player.manaPoints.current / player.manaPoints.max) * 100;
  };

  const getHealthColor = (percentage: number) => {
    if (percentage > 70) return '#4CAF50'; // Green
    if (percentage > 30) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const renderPlayer = (player: Player) => (
    <Link href={`/player/${player.id}`} asChild key={player.id}>
      <Pressable style={styles.playerCard}>
        <View style={styles.playerHeader}>
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.playerDetails}>
              Level {player.level} {player.race} {player.class}
            </Text>
            <Text style={styles.playerLocation}>📍 {player.currentLocation}</Text>
          </View>
          <View style={styles.playerStats}>
            <View style={styles.statContainer}>
              <Text style={styles.statLabel}>HP</Text>
              <View style={styles.statBar}>
                <View 
                  style={[
                    styles.statFill, 
                    { 
                      width: `${getHealthPercentage(player)}%`,
                      backgroundColor: getHealthColor(getHealthPercentage(player))
                    }
                  ]} 
                />
              </View>
              <Text style={styles.statText}>
                {player.healthPoints.current}/{player.healthPoints.max}
              </Text>
            </View>
            {player.manaPoints.max > 0 && (
              <View style={styles.statContainer}>
                <Text style={styles.statLabel}>MP</Text>
                <View style={styles.statBar}>
                  <View 
                    style={[
                      styles.statFill, 
                      { 
                        width: `${getManaPercentage(player)}%`,
                        backgroundColor: '#2196F3'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.statText}>
                  {player.manaPoints.current}/{player.manaPoints.max}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.playerFooter}>
          <Text style={styles.itemCount}>
            🎒 {player.items.reduce((total, item) => total + item.quantity, 0)} items
          </Text>
          <IconSymbol name="chevron.right" color={colors.textSecondary} size={16} />
        </View>
      </Pressable>
    </Link>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => console.log('Add player pressed')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="plus" color={colors.primary} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => console.log('Settings pressed')}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="gear" color={colors.primary} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "D&D Party Manager",
            headerRight: renderHeaderRight,
            headerLeft: renderHeaderLeft,
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
          <View style={styles.header}>
            <Text style={styles.title}>Your D&D Party</Text>
            <Text style={styles.subtitle}>
              Manage your players' adventures, stats, and inventory
            </Text>
          </View>
          
          <View style={styles.playersContainer}>
            {samplePlayers.map(renderPlayer)}
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
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  playersContainer: {
    gap: 12,
  },
  playerCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.accent,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  playerInfo: {
    flex: 1,
    marginRight: 16,
  },
  playerName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  playerDetails: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  playerLocation: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  playerStats: {
    minWidth: 120,
  },
  statContainer: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  statBar: {
    height: 8,
    backgroundColor: colors.highlight,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 2,
  },
  statFill: {
    height: '100%',
    borderRadius: 4,
  },
  statText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  playerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
  },
  itemCount: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
