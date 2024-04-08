import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import styles from './HomeScreen.style';
import {AssetURL} from '../../constants/App.constants';
import {HomeScreenViewProps, Movie} from '../../types/Store.type';

const HomeScreenView = (props: HomeScreenViewProps) => {
  const {moviesList, handleLoadMore} = props;
  const renderMovieItem = ({item}: {item: Movie}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: `${AssetURL}/t/p/w500/${item.poster_path}`}}
          style={styles.poster}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={moviesList}
        renderItem={renderMovieItem}
        keyExtractor={item => item.id.toString() + item.original_title}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export default HomeScreenView;
