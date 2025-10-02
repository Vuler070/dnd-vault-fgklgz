
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable } from "react-native";
import { Stack } from "expo-router";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";

export default function ProfileScreen() {
  console.log('ProfileScreen rendered');

  const renderHeaderRight = () => (
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
            title: "DM Profile",
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
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <IconSymbol name="person.circle.fill" color={colors.primary} size={80} />
            </View>
            <Text style={styles.title}>Dungeon Master</Text>
            <Text style={styles.subtitle}>Campaign Manager</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Campaign Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>4</Text>
                <Text style={styles.statLabel}>Active Players</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Sessions Played</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Locations</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>47</Text>
                <Text style={styles.statLabel}>Total Items</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Campaign Info</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <IconSymbol name="book.fill" color={colors.primary} size={20} />
                <Text style={styles.infoText}>The Lost Kingdom Campaign</Text>
              </View>
              <View style={styles.infoRow}>
                <IconSymbol name="calendar" color={colors.primary} size={20} />
                <Text style={styles.infoText}>Started: March 2024</Text>
              </View>
              <View style={styles.infoRow}>
                <IconSymbol name="location.fill" color={colors.primary} size={20} />
                <Text style={styles.infoText}>Current Arc: The Dragon&apos;s Lair</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsContainer}>
              <Pressable style={styles.actionButton}>
                <IconSymbol name="plus.circle.fill" color={colors.card} size={24} />
                <Text style={styles.actionText}>Add Player</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <IconSymbol name="dice.fill" color={colors.card} size={24} />
                <Text style={styles.actionText}>Roll Dice</Text>
              </Pressable>
              <Pressable style={styles.actionButton}>
                <IconSymbol name="map.fill" color={colors.card} size={24} />
                <Text style={styles.actionText}>View Map</Text>
              </Pressable>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
    padding: 24,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: colors.card,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.accent,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  headerButtonContainer: {
    padding: 6,
  },
});
