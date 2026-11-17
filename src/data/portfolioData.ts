export type PageRoute = 'overview' | 'projects' | 'veyrith' | 'journey' | 'contact';

export type ProjectCategory = 'all' | 'vision' | 'llm' | 'hackathon';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  year: string;
  stack: string[];
  summary: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  featured?: boolean;
  visualType: 'garbage' | 'llm' | 'gesture' | 'veyrith';
}

export interface WasteSample {
  id: string;
  name: string;
  classLabel: string;
  recyclability: string;
  confidence: number;
  bbox: { x: number; y: number; w: number; h: number };
  contourPath: string;
  innerDetailPath: string;
  hsvProfile: { channel: string; value: number }[];
  inferenceMs: number;
}

export interface JourneyMilestone {
  index: string;
  period: string;
  institution: string;
  location: string;
  role: string;
  description: string;
  highlights: string[];
}

export const PROFILE = {
  name: 'Narsing Pavithra',
  age: 19,
  headline: 'Engineering visual intelligence and language systems.',
  subheadline:
    'Python ML engineer, OpenCV developer, and LLM trainer studying at Newton School of Technology, St. Mary’s Institute of Technology, Hyderabad — and Co-Founder of Veyrith Labs.',
  location: 'Hyderabad, India',
  college: "Newton School of Technology · St. Mary's Institute of Technology",
  school: 'Kendriya Vidyalaya',
  venture: {
    name: 'Veyrith Labs',
    url: 'https://www.veyrith-labs.com/',
    screenshotPath: '/assets/aistudio/Screenshot_2026-11-17_at_7.23.32_PM_96806995.png',
    role: 'Co-Founder',
    stage: 'Pre-Launch Engineering Lab',
    established: 'Est. 2026',
  },
  email: 'pavithra@veyrith-labs.com',
};

export const HERO_METRICS = [
  { label: 'Age & Base', value: '19 · Hyderabad' },
  { label: 'Core Focus', value: 'Python ML & OpenCV' },
  { label: 'Model Craft', value: 'LLM Fine-Tuning' },
  { label: 'Venture', value: 'Co-Founder, Veyrith Labs' },
];

export const WASTE_SAMPLES: WasteSample[] = [
  {
    id: 'plastic',
    name: 'PET Polymer Bottle',
    classLabel: 'Recyclable Plastic · Grade 1',
    recyclability: 'Sort to Polymer Recovery Stream',
    confidence: 96.4,
    bbox: { x: 96, y: 44, w: 128, h: 158 },
    contourPath:
      'M145 50 L175 50 L177 66 L198 86 L204 184 Q204 196 190 196 L130 196 Q116 196 116 184 L122 86 L143 66 Z',
    innerDetailPath: 'M130 112 L190 112 M128 138 L192 138 M147 50 L147 64 M173 50 L173 64',
    hsvProfile: [
      { channel: 'Hue Specular', value: 78 },
      { channel: 'Edge Gradient', value: 91 },
      { channel: 'Contour Solidity', value: 88 },
    ],
    inferenceMs: 18,
  },
  {
    id: 'organic',
    name: 'Organic Biomass Peel',
    classLabel: 'Biodegradable Organic',
    recyclability: 'Route to Aerobic Composting',
    confidence: 94.8,
    bbox: { x: 74, y: 66, w: 172, h: 124 },
    contourPath:
      'M84 134 Q102 82 162 76 Q216 74 236 122 Q242 162 198 178 Q144 186 96 164 Q78 152 84 134 Z',
    innerDetailPath: 'M108 132 Q154 102 208 128 M124 152 Q162 140 196 154',
    hsvProfile: [
      { channel: 'Hue Specular', value: 64 },
      { channel: 'Edge Gradient', value: 74 },
      { channel: 'Contour Solidity', value: 93 },
    ],
    inferenceMs: 16,
  },
  {
    id: 'metal',
    name: 'Pressed Aluminum Can',
    classLabel: 'Ferrous & Non-Ferrous Metal',
    recyclability: 'Sort to Eddy-Current Smelter',
    confidence: 97.9,
    bbox: { x: 108, y: 52, w: 104, h: 146 },
    contourPath:
      'M120 62 Q160 54 200 62 L204 180 Q160 192 116 180 Z',
    innerDetailPath:
      'M120 68 Q160 76 200 68 M132 106 L188 118 M124 146 L196 146',
    hsvProfile: [
      { channel: 'Hue Specular', value: 94 },
      { channel: 'Edge Gradient', value: 89 },
      { channel: 'Contour Solidity', value: 96 },
    ],
    inferenceMs: 14,
  },
  {
    id: 'paper',
    name: 'Corrugated Fiber Box',
    classLabel: 'Cellulose & Paperboard',
    recyclability: 'Route to Dry Pulp Baler',
    confidence: 93.2,
    bbox: { x: 68, y: 60, w: 184, h: 130 },
    contourPath:
      'M76 92 L156 66 L242 94 L242 160 L158 184 L76 158 Z',
    innerDetailPath:
      'M76 92 L158 118 L242 94 M158 118 L158 184 M114 78 L198 106',
    hsvProfile: [
      { channel: 'Hue Specular', value: 52 },
      { channel: 'Edge Gradient', value: 95 },
      { channel: 'Contour Solidity', value: 90 },
    ],
    inferenceMs: 19,
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'garbage-classifier',
    title: 'Automated Garbage Classifier',
    subtitle: 'Real-time OpenCV segmentation & CNN waste stream categorization',
    category: 'vision',
    categoryLabel: 'Computer Vision',
    year: '2026',
    stack: ['Python', 'OpenCV', 'PyTorch', 'MobileNetV3', 'NumPy'],
    summary:
      'An end-to-end computer vision waste sorting pipeline that isolates foreground waste items using adaptive thresholding and Canny contour extraction in OpenCV before classifying them across recyclable, organic, metallic, and paper streams.',
    architecture: [
      'Frame preprocessing with Gaussian denoising, CLAHE contrast normalization, and HSV background suppression.',
      'Contour-bounded ROI cropping in OpenCV to isolate target objects before neural forward pass.',
      'Lightweight MobileNetV3-Small backbone fine-tuned with CutMix augmentation for uneven lighting robustness.',
      'Low-latency ONNX runtime export achieving sub-20ms per frame inference on CPU edge hardware.',
    ],
    metrics: [
      { label: 'Validation Accuracy', value: '95.8%' },
      { label: 'Frame Latency', value: '17 ms' },
      { label: 'Waste Classes', value: '6 Streams' },
    ],
    featured: true,
    visualType: 'garbage',
  },
  {
    id: 'llm-trainer-pipeline',
    title: 'Instruction LLM Fine-Tuning Harness',
    subtitle: 'Parameter-efficient LoRA alignment & synthetic dataset curation',
    category: 'llm',
    categoryLabel: 'LLM Training',
    year: '2026',
    stack: ['Python', 'PyTorch', 'PEFT / LoRA', 'HuggingFace', 'WandB'],
    summary:
      'A reproducible training and evaluation harness for adapting open-weight language models on structured reasoning and technical Q&A corpora using QLoRA quantization and custom preference filtering.',
    architecture: [
      'Automated deduplication and perplexity filtering pipeline over raw domain instruction pairs.',
      '4-bit NF4 quantized LoRA training schedule with cosine learning-rate decay and gradient checkpointing.',
      'Deterministic evaluation suite measuring format adherence, hallucination rate, and token throughput.',
    ],
    metrics: [
      { label: 'Eval Loss Drop', value: '2.41 → 0.89' },
      { label: 'VRAM Footprint', value: '14.2 GB' },
      { label: 'Pass@1 Gain', value: '+22.4%' },
    ],
    visualType: 'llm',
  },
  {
    id: 'hackathon-gesture-vision',
    title: 'Real-Time Sign & Gesture Interpreter',
    subtitle: '24-hour hackathon prototype translating hand landmarks to live speech',
    category: 'hackathon',
    categoryLabel: 'Hackathon Build',
    year: '2025',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Scikit-Learn', 'FastAPI'],
    summary:
      'Built under a rapid hackathon sprint, this spatial-keypoint classifier tracks 21 hand landmarks per frame via OpenCV and MediaPipe, normalizing geometric angles to recognize dynamic gesture sequences in real time.',
    architecture: [
      'Scale- and translation-invariant bone-vector normalization across 21 3D hand keypoints.',
      'Sliding-window temporal smoothing to prevent jittery predictions during rapid hand transitions.',
      'Low-footprint FastAPI WebSocket stream rendering sub-30ms annotated video feedback.',
    ],
    metrics: [
      { label: 'Build Sprint', value: '24 Hours' },
      { label: 'Stream Rate', value: '30 FPS' },
      { label: 'Gesture Classes', value: '28 Signs' },
    ],
    visualType: 'gesture',
  },
  {
    id: 'veyrith-signal-research',
    title: 'Veyrith Signal & Pattern Engine',
    subtitle: 'Pre-launch intelligence modeling and structured signal extraction',
    category: 'llm',
    categoryLabel: 'Applied Systems',
    year: '2026',
    stack: ['Python', 'PyTorch', 'Vector Indexing', 'Time-Series ML'],
    summary:
      'Core pre-development research system built at Veyrith Labs focused on extracting coherent, verifiable signals from noisy operational streams without speculative claims.',
    architecture: [
      'Multi-horizon sequence encoding paired with anomaly residuals for clean signal isolation.',
      'Deterministic verification layer ensuring every surfaced pattern links back to empirical source data.',
    ],
    metrics: [
      { label: 'Stage', value: 'Pre-Launch' },
      { label: 'Role', value: 'Co-Founder' },
      { label: 'Domain', value: 'Systems R&D' },
    ],
    visualType: 'veyrith',
  },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    index: '01',
    period: 'Foundations',
    institution: 'Kendriya Vidyalaya',
    location: 'India',
    role: 'Higher Secondary Education · Science & Mathematics',
    description:
      'Developed strong analytical fundamentals in mathematics, physics, and algorithmic thinking while writing first Python scripts and exploring automated problem solving.',
    highlights: [
      'Mathematics & Computer Science focus',
      'Early Python automation experiments',
      'Peer coding & science exhibitions',
    ],
  },
  {
    index: '02',
    period: 'Competitive Prototyping',
    institution: 'Hackathon Circuit',
    location: 'National & Campus Hackathons',
    role: 'ML & Computer Vision Builder',
    description:
      'Competed in intense multi-hour hackathons, shipping working OpenCV and Python ML prototypes from zero to live demo under tight deadlines and real-world constraints.',
    highlights: [
      'Rapid OpenCV & MediaPipe vision pipelines',
      'Team technical scoping & live pitch demos',
      'End-to-end model deployment under 24–48h',
    ],
  },
  {
    index: '03',
    period: 'Present · Year 1',
    institution: "Newton School of Technology · St. Mary's Institute of Technology",
    location: 'Hyderabad',
    role: 'First-Year Undergraduate · Computer Science & AI',
    description:
      'Currently in first year pursuing deep engineering fundamentals, combining rigorous systems coursework with hands-on research in computer vision and large language model training.',
    highlights: [
      'Garbage Classifier CV pipeline',
      'LoRA / QLoRA LLM fine-tuning experiments',
      'Applied Python ML & linear algebra',
    ],
  },
  {
    index: '04',
    period: 'Est. 2026 · Pre-Launch',
    institution: 'Veyrith Labs',
    location: 'veyrith-labs.com',
    role: 'Co-Founder · Pre-Development Engineering Lab',
    description:
      'Co-founded Veyrith Labs at age 19 to build thoughtful software and research the systems behind engineering intelligence — prioritizing clear evidence and useful technology ahead of launch.',
    highlights: [
      'Pre-development systems & ML architecture',
      'Independent R&D in signals & intelligence',
      'Co-leading technical direction at 19',
    ],
  },
];

export const CAPABILITIES = [
  {
    index: '01',
    title: 'Python ML Engineering',
    detail:
      'Data curation, PyTorch training loops, feature engineering, model quantization, and clean reproducible evaluation harnesses.',
    tools: ['Python', 'PyTorch', 'NumPy', 'Scikit-Learn', 'ONNX'],
  },
  {
    index: '02',
    title: 'OpenCV Computer Vision',
    detail:
      'Real-time frame processing, contour detection, HSV masking, background subtraction, optical flow, and edge-ready object classification.',
    tools: ['OpenCV', 'MediaPipe', 'CLAHE', 'Canny Edges', 'MobileNetV3'],
  },
  {
    index: '03',
    title: 'LLM Training & Alignment',
    detail:
      'Supervised fine-tuning, LoRA / QLoRA parameter-efficient adaptation, tokenizer workflows, synthetic corpus filtering, and loss diagnostics.',
    tools: ['Transformers', 'PEFT', 'QLoRA', 'Tokenization', 'Eval Suites'],
  },
];
