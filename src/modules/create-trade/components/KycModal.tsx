import React, { PropsWithChildren, useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Typography } from '@components/Typography';
import { Modal } from '@components/Modal';
import { InsuranceIcon } from '@components/icons/InsuranceIcon';
import { KycRating } from '@types';
import { KycIcon } from '@components/icons/KycIcon';
import { Link } from '@components/Link';

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

export const KycModal = (props: Props) => {
  const { t } = useTranslation();
  const gradeDescriptions = useMemo<Record<KycRating, string>>(() => {
    return {
      A: t('kycHelp.a'),
      B: t('kycHelp.b'),
      C: t('kycHelp.c'),
      D: t('kycHelp.d'),
    };
  }, [t]);

  return (
    <Modal title="KYC" {...props}>
      <View className="gap-y-1">
        {Object.keys(gradeDescriptions).map((grade) => (
          <View key={grade} className="flex-row items-start">
            <KycIcon rating={grade as KycRating} className="mt-0.5" />
            <Typography className="text-gray-50 ml-2 flex-1 flex-wrap">
              {gradeDescriptions[grade as keyof typeof gradeDescriptions]}
            </Typography>
          </View>
        ))}
      </View>

      <View className="flex-row items-start mt-4">
        <InsuranceIcon rate={70} style={{ width: 16, height: 16, marginTop: 4 }} />
        <View>
          <Typography className="ml-2 text-gray-50">
            {t('kycHelp.insurance')}:{' '}
            <Link url="http://trocador.app" textClassName="text-primary" iconClassName="text-primary">
              Trocador
            </Link>
          </Typography>
        </View>
      </View>
    </Modal>
  );
};
