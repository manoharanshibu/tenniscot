import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { X, Star, TrendingUp, Activity } from 'lucide-react-native';
import { Player } from '@/types/Player';
import ScoreSelector from './ScoreSelector';

interface PlayerEvaluationModalProps {
  visible: boolean;
  player: Player | null;
  onClose: () => void;
  onSave: (playerId: string, tennisScore: number, fitnessScore: number) => void;
}

export default function PlayerEvaluationModal({
  visible,
  player,
  onClose,
  onSave,
}: PlayerEvaluationModalProps) {
  const [tennisScore, setTennisScore] = useState(5);
  const [fitnessScore, setFitnessScore] = useState(5);

  const handleSave = () => {
    if (player) {
      onSave(player.id, tennisScore, fitnessScore);
      onClose();
    }
  };

  const handleClose = () => {
    // Reset scores when closing
    setTennisScore(5);
    setFitnessScore(5);
    onClose();
  };

  if (!player) return null;

  const getMembershipColor = (type: string) => {
    switch (type) {
      case 'Premium':
        return '#f59e0b';
      case 'Junior':
        return '#059669';
      default:
        return '#6b7280';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Player Evaluation</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <X size={24} color="#374151" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Player Info Section */}
          <View style={styles.playerSection}>
            <Image source={{ uri: player.profileImage }} style={styles.profileImage} />
            <View style={styles.playerInfo}>
              <View style={styles.nameRankContainer}>
                <Text style={styles.playerName}>{player.name}</Text>
                <View style={styles.rankingBadge}>
                  <Text style={styles.rankingText}>#{player.ranking}</Text>
                </View>
              </View>
              <Text style={styles.locationText}>{player.location}</Text>
              <View style={[styles.membershipBadge, { backgroundColor: getMembershipColor(player.membershipType) }]}>
                <Text style={styles.membershipText}>{player.membershipType}</Text>
              </View>
            </View>
          </View>

          {/* Current Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Current Performance</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <TrendingUp size={20} color="#059669" />
                <Text style={styles.statValue}>{player.winRate}%</Text>
                <Text style={styles.statLabel}>Win Rate</Text>
              </View>
              <View style={styles.statCard}>
                <Activity size={20} color="#1e40af" />
                <Text style={styles.statValue}>{player.matchesPlayed}</Text>
                <Text style={styles.statLabel}>Matches</Text>
              </View>
            </View>
          </View>

          {/* Evaluation Section */}
          <View style={styles.evaluationSection}>
            <Text style={styles.sectionTitle}>Evaluation Scores</Text>
            
            {/* Tennis Score */}
            <View style={styles.scoreSection}>
              <View style={styles.scoreLabelContainer}>
                <Star size={20} color="#f59e0b" />
                <Text style={styles.scoreLabel}>Tennis Skills</Text>
              </View>
              <Text style={styles.scoreDescription}>
                Rate technical skills, strategy, and court awareness
              </Text>
              <ScoreSelector
                value={tennisScore}
                onChange={setTennisScore}
                color="#f59e0b"
              />
            </View>

            {/* Fitness Score */}
            <View style={styles.scoreSection}>
              <View style={styles.scoreLabelContainer}>
                <Activity size={20} color="#dc2626" />
                <Text style={styles.scoreLabel}>Fitness Level</Text>
              </View>
              <Text style={styles.scoreDescription}>
                Rate endurance, agility, and physical conditioning
              </Text>
              <ScoreSelector
                value={fitnessScore}
                onChange={setFitnessScore}
                color="#dc2626"
              />
            </View>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Evaluation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  playerSection: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  playerInfo: {
    flex: 1,
  },
  nameRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  playerName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  rankingBadge: {
    backgroundColor: '#1e40af',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rankingText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  locationText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 12,
  },
  membershipBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  membershipText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  statsSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  evaluationSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scoreSection: {
    marginBottom: 24,
  },
  scoreLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  scoreDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#059669',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});