
import { Asset3D } from './types';

export const SAMPLE_ASSETS: Asset3D[] = [
  {
    id: '1',
    title: 'Archive Astronaut',
    thumbnail: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
    date: '2024-05-12',
    category: 'Object',
    polyCount: '45k',
    fileSize: '2.5MB',
    isHighlighted: true,
    description: 'A classic 3D astronaut model used for neural testing and fidelity calibration.',
    tags: ['Space', 'NASA', 'Suit'],
    author: {
      name: 'Devon Lane',
      avatar: 'https://i.pravatar.cc/150?u=devon'
    },
    versions: [
      { date: '2024-01-01', modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', label: 'Alpha Capture' },
      { date: '2024-03-15', modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', label: 'Fidelity Pass' },
      { date: '2024-05-12', modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', label: 'Final Archive' }
    ]
  },
  {
    id: '2',
    title: 'Heritage Suit',
    thumbnail: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb',
    date: '2024-05-08',
    category: 'Art',
    tags: ['History', 'Museum', 'Textile'],
     author: {
      name: 'Theresa Webb',
      avatar: 'https://i.pravatar.cc/150?u=theresa'
    },
    polyCount: '89k',
    fileSize: '15.4MB',
    isHighlighted: true,
    description: 'Detailed scan of a historical space suit, preserving every fiber in 3D space.'
  },
  {
    id: '3',
    title: 'Battle Damaged Helmet',
    thumbnail: 'https://modelviewer.dev/shared-assets/models/DamagedHelmet.glb',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/DamagedHelmet.glb',
    date: '2024-05-10',
    category: 'Object',
    tags: ['Sci-Fi', 'Metal', 'Damage'],
     author: {
      name: 'Cameron Williamson',
      avatar: 'https://i.pravatar.cc/150?u=cameron'
    },
    polyCount: '12k',
    fileSize: '1.2MB',
    description: 'Industrial helmet reconstruction captured using high-density photogrammetry.'
  },
  {
    id: '4',
    title: 'Expressive Bot',
    thumbnail: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb',
    date: '2024-05-01',
    category: 'Object',
    tags: ['Robotics', 'A.I.', 'Mech'],
     author: {
      name: 'Guy Hawkins',
      avatar: 'https://i.pravatar.cc/150?u=guy'
    },
    polyCount: '15k',
    fileSize: '2.1MB',
    description: 'Next-gen robotics prototype with expressive capabilities.'
  },
  {
    id: '5',
    title: 'Equine Study',
    thumbnail: 'https://modelviewer.dev/shared-assets/models/Horse.glb',
    modelUrl: 'https://modelviewer.dev/shared-assets/models/Horse.glb',
    date: '2024-04-28',
    category: 'Environment',
    tags: ['Nature', 'Mammal', 'Organic'],
     author: {
      name: 'Jenny Wilson',
      avatar: 'https://i.pravatar.cc/150?u=jenny'
    },
    polyCount: '2.4M',
    fileSize: '112.5MB',
    description: 'Anatomical study of equine muscle structure.'
  }
];
