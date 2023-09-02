import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUsers} from '../app/features/user/userSlice';

export default function UserScreen() {
  const {loading, error, users} = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log('Users', users);

  return (
    <View style={styles.container}>
      <View>
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <>
            <View>
              <Text style={styles.title}>Top 10 User</Text>

              <FlatList
                horizontal
                data={users}
                renderItem={({item}) => (
                  <View style={styles.avatarContainer}>
                    <Image source={{uri: item.avatar}} style={styles.avatar} />
                    <Text style={styles.fullNameText}>
                      {item.first_name} {item.last_name}
                    </Text>
                  </View>
                )}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
              />
              <View style={styles.latestContainer}>
                <Text style={styles.title}>Recent User</Text>

                <FlatList
                  data={users}
                  numColumns={2}
                  renderItem={({item}) => (
                    <View style={styles.latestListContainer}>
                      <Image
                        source={{uri: item.avatar}}
                        style={styles.avatar}
                      />
                      <Text style={styles.fullNameText}>
                        {item.first_name} {item.last_name}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  avatar: {width: 50, height: 50},
  avatarContainer: {
    backgroundColor: '#86bec6',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
  },
  latestListContainer: {
    // width: Dimensions.get('screen').width * 0.495,
    backgroundColor: '#86bec6',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  fullNameText: {fontSize: 12, fontWeight: '600'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
  latestContainer: {marginVertical: 50},
});
