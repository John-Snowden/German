/* eslint-disable react-hooks/exhaustive-deps */
import RNFetchBlob from 'rn-fetch-blob';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';

import {styles} from './styles';
import {defaults} from './German';

const App: React.FC = () => {
  const [settingsOslik, setSettingsOslik] = useState<TSettings | null>(null);
  const [settingsGerman, setSettingsGerman] = useState<TSettings | null>(null);

  const basePath = RNFetchBlob.fs.dirs.DownloadDir;
  const settingsPathOslik = basePath + '/Oslik.json';
  const settingsPathGerman = basePath + '/German.json';

  const getSettingsGerman = async () => {
    const isSettings = await RNFetchBlob.fs.exists(settingsPathGerman);
    if (!isSettings) {
      const defaultSettings = JSON.stringify(defaults);
      await RNFetchBlob.fs.writeFile(
        settingsPathGerman,
        defaultSettings,
        'utf8',
      );
      getSettingsGerman();
    } else {
      const json = await RNFetchBlob.fs.readFile(settingsPathGerman, 'utf8');
      setSettingsGerman(JSON.parse(json));
    }
  };

  const getSettingsOslik = async () => {
    const isSettingsExist = await RNFetchBlob.fs.exists(settingsPathOslik);
    if (!isSettingsExist) {
      const defaultSettings = JSON.stringify(defaults);
      await RNFetchBlob.fs.writeFile(
        settingsPathOslik,
        defaultSettings,
        'utf8',
      );
      getSettingsOslik();
    } else {
      const json = await RNFetchBlob.fs.readFile(settingsPathOslik, 'utf8');
      if (json !== JSON.stringify(settingsOslik)) {
        setSettingsOslik(JSON.parse(json));
      }
    }
  };

  const setRequestingRecordedRoutes = () => {
    if (!settingsGerman) return;
    setSettingsGerman({
      ...settingsGerman,
      isClientRequestingRecordedRoutes:
        !settingsGerman.isClientRequestingRecordedRoutes,
    });
  };

  const setRequestingPendingRoutes = () => {
    if (!settingsGerman) return;
    setSettingsGerman({
      ...settingsGerman,
      isClientRequestingPendingRoutes:
        !settingsGerman.isClientRequestingPendingRoutes,
    });
  };

  const updateSettings = async () => {
    try {
      await RNFetchBlob.fs.writeFile(
        settingsPathOslik,
        JSON.stringify(settingsGerman),
        'utf8',
      );
      await RNFetchBlob.fs.writeFile(
        settingsPathGerman,
        JSON.stringify(settingsGerman),
        'utf8',
      );
    } catch (e) {
      console.log('error', e);
    }
  };
  const getPermissions = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ),
      getSettingsGerman();
    setInterval(() => getSettingsOslik(), 1000);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  if (!settingsOslik) {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>Загрузка настроек из файла Oslik.json</Text>
        <ActivityIndicator color={'white'} />
      </View>
    );
  }

  if (!settingsGerman) {
    return (
      <View style={styles.screen}>
        <Text style={styles.text}>Загрузка настроек из файла German.json</Text>
        <ActivityIndicator color={'white'} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.text}>Oslik AI </Text>
        {settingsOslik.isServerFoundSettings ? (
          <Text style={styles.text}>Сервер нашел настройки на клиенте</Text>
        ) : (
          <ActivityIndicator color={'white'} />
        )}
      </View>
      <View style={styles.wrapper}>
        <View style={styles.settingWrapper}>
          <View style={styles.subheader}>
            <Text style={styles.text}>Текущие настройки</Text>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingName}>
              <Text style={styles.text}>
                Записывать на прилку маршруты от Ослика?
              </Text>
            </View>
            <Text style={[styles.text, styles.margRight]}>
              {String(settingsOslik.isClientRequestingRecordedRoutes)}
            </Text>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingName}>
              <Text style={[styles.text, styles.margRight]}>
                Количество записанных маршрутов от Ослика:
              </Text>
            </View>
            <Text style={[styles.text, styles.margRight]}>
              {settingsOslik.recordedRoutes.length}
            </Text>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingName}>
              <Text style={styles.text}>
                Передавать маршруты Ослику на выполнение?
              </Text>
            </View>
            <Text style={[styles.text, styles.margRight]}>
              {String(settingsOslik.isClientRequestingPendingRoutes)}
            </Text>
          </View>
          <View style={styles.setting}>
            <View style={styles.settingName}>
              <Text style={styles.text}>
                Количество маршрутов переданных Ослику на выполнение:
              </Text>
            </View>
            <Text style={[styles.text, styles.margRight]}>
              {settingsOslik.pendingRoutes.length}
            </Text>
          </View>
        </View>
        <View style={styles.settingWrapper}>
          <View style={styles.subheader}>
            <Text style={styles.text}>Обновленные настройки</Text>
          </View>
          <TouchableOpacity
            onPress={setRequestingRecordedRoutes}
            style={styles.setting}>
            <View style={styles.settingName}>
              <Text style={styles.text}>
                Записывать на прилку маршруты от Ослика?
              </Text>
            </View>
            <Text style={[styles.text, styles.margRight]}>
              {String(settingsGerman.isClientRequestingRecordedRoutes)}
            </Text>
          </TouchableOpacity>
          <View style={styles.setting}>
            <View style={styles.settingName}>
              <Text style={[styles.text, styles.margRight]}>
                Количество записанных маршрутов от Ослика:
              </Text>
            </View>
            <Text style={[styles.text, styles.margRight]}>
              {settingsGerman.recordedRoutes.length}
            </Text>
          </View>
          <TouchableOpacity
            onPress={setRequestingPendingRoutes}
            style={styles.setting}>
            <View style={styles.settingName}>
              <Text style={styles.text}>
                Передавать маршруты Ослику на выполнение?
              </Text>
            </View>
            <Text style={[styles.text, styles.margRight]}>
              {String(settingsGerman.isClientRequestingPendingRoutes)}
            </Text>
          </TouchableOpacity>
          <View style={styles.setting}>
            <View style={styles.settingName}>
              <Text style={styles.text}>
                Количество маршрутов переданных Ослику на выполнение:
              </Text>
            </View>
            <Text style={[styles.text, styles.margRight]}>
              {settingsGerman.pendingRoutes.length}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btn} onPress={updateSettings}>
        <Text style={styles.text}>Применить</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default App;

type TSettings = {
  isClientRequestingRecordedRoutes: boolean;
  isClientRequestingPendingRoutes: boolean;
  recordedRoutes: TRoute[];
  pendingRoutes: TRoute[];
  isServerFoundSettings: boolean;
};

type TRoute = {
  id: string;
  distance: number;
  degree: number;
  speed: number;
  timeout: number;
};
