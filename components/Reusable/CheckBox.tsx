// components/CheckBox.tsx
import { Check } from 'lucide-react-native'; // or any icon you want
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface CheckBoxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange }) => {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      className="flex flex-row items-center gap-x-2"
    >
      <View
        className={`w-5 h-5 border rounded ${
          checked ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
        } items-center justify-center`}
      >
        {checked && <Check size={14} color="#fff" />}
      </View>
      {label && <Text className="text-border font-bold text-sm">{label}</Text>}
    </Pressable>
  );
};

export default CheckBox;
