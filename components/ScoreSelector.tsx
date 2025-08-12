import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SimplePicker from 'react-simple-picker';

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

  const options = scores.map(score => ({
    label: `${score} - ${getScoreLabel(score)}`,
    value: score
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.pickerContainer, { borderColor: color }]}>
        <SimplePicker
          options={options}
          selectedValue={value}
          onValueChange={(selectedValue) => onChange(selectedValue)}
          style={styles.picker}
          placeholder="Select a score..."
        />
      </View>
      
      <View style={styles.selectedScoreContainer}>
        <Text style={styles.selectedScoreLabel}>Selected Score:</Text>
        <Text style={[styles.selectedScore, { color }]}>
          {value}/10 - {getScoreLabel(value)}
        </Text>
      </View>
      
      <View style={styles.scaleLabels}>
        <Text style={styles.scaleLabel}>1-3: Poor</Text>
        <Text style={styles.scaleLabel}>4-5: Fair</Text>
        <Text style={styles.scaleLabel}>6-7: Good</Text>
        <Text style={styles.scaleLabel}>8-9: Excellent</Text>
        <Text style={styles.scaleLabel}>10: Outstanding</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  pickerContainer: {
    borderWidth: 2,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  picker: {
    fontSize: 16,
    color: '#111827',
  },
  selectedScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
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
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    gap: 8,
  },
  scaleLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
});