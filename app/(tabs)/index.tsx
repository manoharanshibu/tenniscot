import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Chrome as Home } from 'lucide-react-native';
import PlayerCard from '@/components/PlayerCard';
import SearchBar from '@/components/SearchBar';
import PlayerEvaluationModal from '@/components/PlayerEvaluationModal';
import { players } from '@/data/players';
import { Player } from '@/types/Player';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) return players;
    
    return players.filter(player =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.membershipType.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handlePlayerPress = (player: Player) => {
    setSelectedPlayer(player);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPlayer(null);
  };

  const handleSaveEvaluation = (playerId: string, tennisScore: number, fitnessScore: number) => {
    // Here you would typically save the evaluation to your backend or local storage
    console.log('Saving evaluation for player:', playerId, {
      tennisScore,
      fitnessScore,
    });
    // You could also update the player data with the new scores
  };

  const renderPlayer = ({ item }: { item: Player }) => (
    <PlayerCard 
      player={item} 
      onPress={() => handlePlayerPress(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#059669', '#047857']}
        style={styles.header}
      >
        <Home size={32} color="#ffffff" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Home</Text>
        <Text style={styles.headerSubtitle}>Tennis Scotland Player Directory</Text>
      </LinearGradient>

      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, location, or membership..."
        />

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredPlayers.length} {filteredPlayers.length === 1 ? 'player' : 'players'} found
          </Text>
        </View>

        <FlatList
          data={filteredPlayers}
          renderItem={renderPlayer}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <PlayerEvaluationModal
        visible={modalVisible}
        player={selectedPlayer}
        onClose={handleCloseModal}
        onSave={handleSaveEvaluation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'center',
  },
  headerIcon: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#d1fae5',
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 100,
  },
});