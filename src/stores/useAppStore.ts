import semver from 'semver';
import { create } from 'zustand';
import { RepositoryRelease } from '@generated/gql';
import { apiClient } from '@libs/api-client';

interface AppState {
  latestRelease?: RepositoryRelease;
  updateLatestRelease: (latestRelease: RepositoryRelease) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  updateLatestRelease: (latestRelease) => set(() => ({ latestRelease })),
}));

const fetchLatestRelease = async () => {
  const response = await apiClient.latestRelease();
  const repoRelease = response.latestRelease;
  const storeState = useAppStore.getState();
  const storeRelease = storeState.latestRelease;

  if (repoRelease && (!storeRelease || semver.gt(repoRelease.version, storeRelease.version))) {
    storeState.updateLatestRelease(repoRelease);
  }
};

setInterval(fetchLatestRelease, 14400000);
fetchLatestRelease();
