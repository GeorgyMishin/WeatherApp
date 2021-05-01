import { ActionFunctionAny } from 'redux-actions';
import {
  request,
  PermissionStatus,
  Permission,
  PERMISSIONS,
} from 'react-native-permissions';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { Platform } from 'react-native';

export const ofType = <T>(actionFunc: ActionFunctionAny<T>) =>
  actionFunc.toString();

export const getLocationPermission = (): Promise<PermissionStatus> =>
  request(
    Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    }) as Permission,
  );

export const getDeviceCoords = (): Promise<GeolocationResponse> =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject);
  });
