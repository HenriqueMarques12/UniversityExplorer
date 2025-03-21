import animation1 from '../../assets/lottie/education.json';
import animation2 from '../../assets/lottie/information.json';

export interface OnboardingItemData {
  id: string;
  title: string;
  description: string;
  animationData: any;
}

export const onboardingData: OnboardingItemData[] = [
  {
    id: '1',
    title: 'Explore Universidades',
    description: 'Descubra as melhores universidades de todo o mundo com informações detalhadas.',
    animationData: animation1,
  },
  {
    id: '2',
    title: 'Fique Informado',
    description: 'Obtenha todas as informações necessárias para tomar decisões informadas sobre sua educação.',
    animationData: animation2,
  },
];
