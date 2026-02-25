import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Search } from "lucide-react-native";
import { SPACING } from '../../../common/styles/spacing';
import { COLORS } from '../../../common/styles/colors';

interface SearchBarProps {
    containerStyle?: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({ containerStyle }) => {
    return (
        <View style={[styles.container, containerStyle]}> 
            <View style={styles.row}>
                <Search size={20} color={COLORS.textSecondary} />
                <TextInput
                    style={styles.input}
                    placeholder="Search your food"
                    placeholderTextColor={COLORS.textSecondary}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING.md,
        marginTop: SPACING.sm,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 8,
        paddingHorizontal: SPACING.md,
        elevation: 2,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: SPACING.md,
        paddingLeft: SPACING.sm,
        color: COLORS.text,
    },
});
