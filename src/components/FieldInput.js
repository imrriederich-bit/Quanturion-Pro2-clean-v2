import { Text, TextInput, View } from "react-native";
import styles from "../styles/appStyles";

export default function FieldInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  textAlign = "left",
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.fieldLabel, { textAlign }]}>{label}</Text>
      <TextInput
        style={[styles.input, { textAlign }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7E8BA5"
        keyboardType={keyboardType}
      />
    </View>
  );
}
