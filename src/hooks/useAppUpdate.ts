import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import semver from 'semver';
import { useAppStore } from '@stores/useAppStore';

export const useAppUpdate = () => {
  const latestRelease = useAppStore((state) => state.latestRelease);
  const [version, setVersion] = useState<string>();
  const [downloadUrl, setDownloadUrl] = useState<string>();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    const currentVersion = Constants.manifest!.version!;

    if (latestRelease && semver.gt(latestRelease.version, currentVersion)) {
      setVersion(latestRelease.version);
      setDownloadUrl(latestRelease.downloadUrl);
      setIsUpdateAvailable(true);
    } else {
      setIsUpdateAvailable(false);
    }
  }, [latestRelease]);

  return { version, downloadUrl, isUpdateAvailable };
};
