import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ScoreSelectorProps {
  value: number;
  onChange: (value: number) => void;
  color: string;
  min?: number;
  max?: number;
}

export default function ScoreSelector({ 
  value, 
  onChange, 
  color, 
  min = 1, 
  max = 10 
}: ScoreSelectorProps) {
  const scores = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  const getScoreLabel = (score: number) => {
    if (score <= 3) return 'Poor';
    if (score <= 5) return 'Fair';
    if (score <= 7) return 'Good';
    if (score <= 9) return 'Excellent';
    return 'Outstanding';
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoresContainer}>
        {scores.map((score) => (
          <TouchableOpacity
            key={score}
            style={[
              styles.scoreButton,
              value === score && { backgroundColor: color },
            ]}
            onPress={() => onChange(score)}
          >
            <Text
              style={[
                styles.scoreText,
                value === score && styles.selectedScoreText,
              ]}
            >
              {score}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.selectedScoreContainer}>
        <Text style={styles.selectedScoreLabel}>Selected Score:</Text>
        <Text style={[styles.selectedScore, { color }]}>
          {value}/10 - {getScoreLabel(value)}
        </Text>
      </View>
      
      <View style={styles.scaleLabels}>
        <Text style={styles.scaleLabel}>Poor</Text>
        <Text style={styles.scaleLabel}>Fair</Text>
        <Text style={styles.scaleLabel}>Good</Text>
        <Text style={styles.scaleLabel}>Excellent</Text>
        <Text style={styles.scaleLabel}>Outstanding</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scoresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  scoreButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  selectedScoreText: {
    color: '#ffffff',
  },
  selectedScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedScoreLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  selectedScore: {
    fontSize: 16,
    fontWeight: '600',
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  scaleLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
});