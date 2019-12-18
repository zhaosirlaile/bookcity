import React from 'react';
import {StyleSheet, StatusBar, FlatList} from 'react-native';

import {View, Text, Icon} from 'native-base';

import style from '../../../../util/utilStyles';
import {DEFAULT_COLOR} from '../../../../util/utilParams';

export default props => {
  return (
    <View style={style.wrap}>
      <View style={style.header}>
        <View style={style.headerLeft}>
          <Icon
            onPress={() => {
              props.navigation.goBack();
            }}
            name="ios-arrow-back"
            style={style.headerColor}
          />
        </View>
        <View style={style.headerCenter}>
          <Text style={style.headerColor}>{props.title}</Text>
          <View />
        </View>
      </View>
      <StatusBar backgroundColor={DEFAULT_COLOR} />

      <View style={style.body}>{_renderFlatList(props)}</View>
    </View>
  );
};

function _renderFlatList(props) {
  return (
    <FlatList
      data={props.catalog.vs}
      renderItem={({item}) => {
        return (
          <Text
            onPress={() => {
              props.navigation.navigate('LibraryNovelReaderStack');
            }}
            style={styles.flatListText}>
            {item.cN}
          </Text>
        );
      }}
      keyExtractor={item => {
        return item.uuid;
      }}
      getItemLayout={(data, index) => ({
        length: 45,
        offset: 45 * index,
        index,
      })}
      initialNumToRender={100}
      removeClippedSubviews={true}
    />
  );
}
const styles = StyleSheet.create({
  header: {
    marginTop: 27,
  },
  headerIcon: {
    fontSize: 20,
  },
  headerText: {
    fontSize: 18,
  },
  headerColor: {
    color: '#B9B9B9',
  },
  flatListText: {
    paddingLeft: 20,
    height: 45,
    fontSize: 15,
    paddingRight: 20,
    textAlignVertical: 'center',
    borderColor: '#fafafa',
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
});
