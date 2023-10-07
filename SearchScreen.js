import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <View>
      <TextInput
        placeholder="검색어를 입력하세요"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Text>검색 결과: {searchText}</Text>
    </View>
  );
}