import { Article } from '@/types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'cursor-ai-student-discount-free-pro',
    slug: 'cursor-ai-student-discount-free-pro',
    title: 'Cursor AI Student Discount: How to Get Cursor Pro Free for 1 Year',
    excerpt: 'Unlock 1 year of Cursor Pro ($240 value) for free using your student email or ID. Get full access to Claude 3.5 Sonnet, GPT-4o, smart tab autocomplete, and codebase chat at zero cost.',
    category: 'Educational',
    readTime: '4 min read',
    publishedDate: '05 Aug 2026',
    viewCount: 1840,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    tags: ['AI Tools', 'Workflow', 'Students', 'Productivity'],
    content: `
### Why Cursor is a Game Changer for Technical Creatives

As 3D artists and digital creators who build web interfaces, manage databases, or write Python automation scripts in Blender, writing clean code quickly is essential. Cursor is a fork of VS Code built from the ground up for AI pair-programming.

With models like Claude 3.5 Sonnet and GPT-4o natively embedded into your editor, you can:
- Generate complete Geometry Node Python scripts in seconds
- Refactor complex Next.js and Three.js components seamlessly
- Debug shader code with codebase-aware context

### Step-by-Step Verification Guide

1. **Prepare Your Academic Email**: Ensure you have an active \`.edu\` or university-affiliated email address (e.g., University of Ruhuna).
2. **Sign Up for a Free Account**: Visit cursor.com and create a standard account using your primary university email.
3. **Submit Verification**: Navigate to the educational discount portal and upload proof of student enrollment (student ID card or semester registration slip).
4. **Instant Activation**: Once approved, your subscription will be upgraded to Cursor Pro with unlimited fast requests.

### Maximizing Your Pro Benefits

- **Multi-File Edits**: Use \`Cmd+K\` or \`Ctrl+K\` to perform synchronized modifications across multiple source files.
- **Codebase Indexing**: Enable high-fidelity embedding indexing for your projects so the AI understands your entire repo architecture.
    `,
  },
  {
    id: 'hard-surface-quad-topology-blender',
    slug: 'hard-surface-quad-topology-blender',
    title: 'Precision Quad Topology & Sub-D Modeling in Blender',
    excerpt: 'Deep dive into avoiding pinching at 5-pole junctions, maintaining uniform face distribution on cylindrical insets, and mastering support loop workflows.',
    category: '3D Pipeline',
    readTime: '7 min read',
    publishedDate: '12 Jan 2026',
    viewCount: 2310,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    tags: ['Blender', 'Hard Surface', 'Topology', 'Subdivision'],
    content: `
### The Mathematics of Clean Subdivision

The difference between amateur 3D modeling and high-end visual production lies in how light flows across curved surfaces. When a specular highlight travels over a seam, any pinched vertex or irregular vertex normal instantly shatters the illusion of reality.

### 1. The Perils of N-Gons and 5-Poles
When you apply a Subdivision Surface modifier in Blender (Catmull-Clark algorithm), all faces are converted into quads. If your base mesh contains N-gons, the algorithm makes arbitrary topological choices that result in micro-creasing.

### 2. The 3-Edge Rule for Bevels
Always reinforce sharp architectural edges with dedicated holding loops. Avoid relying purely on auto-smoothing angles when the asset will undergo dynamic camera close-ups in commercial product CGI.

### 3. Maintaining Curvature with Shrinkwrap
For complex circular cutouts into curved fuselages (such as in the *Titan Visor MK-IV*), always model cutouts on a planar surface first, project them using a Shrinkwrap modifier onto a high-res target cylinder, and preserve flawless reflection paths.
    `,
  },
  {
    id: 'cinematic-lighting-cycles-eevee-next',
    slug: 'cinematic-lighting-cycles-eevee-next',
    title: 'Cinematic Lighting Principles: From Gallery Stills to Virtual Sets',
    excerpt: 'How to use negative fill, volumetric light scattering, and three-point studio lighting to evoke mystery and tactile materiality in 3D renders.',
    category: 'Lighting & Art Direction',
    readTime: '6 min read',
    publishedDate: '18 Feb 2026',
    viewCount: 1540,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    tags: ['Cycles', 'Eevee Next', 'Lighting', 'Art Direction'],
    content: `
### Light as an Architectural Element

Lighting isn't just about illuminating the subject — it is about carving silhouettes out of darkness. In commercial CGI and editorial portfolio presentation, high-key ambient lighting often flattens forms and eliminates drama.

### 1. The Power of Negative Fill
In real photographic studios, black flags are positioned opposite key lights to absorb bounce light. In Blender, creating non-reflective black geometry cards near your asset deepens shadow falloff and brings out metallic crispness.

### 2. Volumetric Ray Scattering in Eevee Next
With the introduction of ray-tracing capabilities and unified shadow pipelines in Eevee Next, atmospheric scattering can be computed in real-time. Use low-density Principled Volume shaders paired with narrow spot lights to achieve tangible sunbeam rays without crushing midtone values.
    `,
  },
];
