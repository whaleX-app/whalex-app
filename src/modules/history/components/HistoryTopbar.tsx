import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@components/Icon';
import { Topbar } from '@components/Topbar';
import { HistoryHelpModal } from './HistoryHelpModal';

export const HistoryTopbar = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HistoryHelpModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <Topbar
        screenTitle={t('history')}
        screenIcon={<Icon name="history" size={24} />}
        actionComponent={
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Icon name="info" size={20} />
          </TouchableOpacity>
        }
      />
    </>
  );
};
