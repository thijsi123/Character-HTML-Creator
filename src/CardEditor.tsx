import React, { useState, useId } from 'react';

/* 
   Types
 */
type Align = 'left' | 'center' | 'right';
type SectType =
  | 'normal'
  | 'heading'
  | 'bubble-left'
  | 'bubble-right'
  | 'group'
  | 'close-group'
  | 'html'
  | 'quote'
  | 'divider'
  | 'image'
  | 'stats'
  | 'traits'
  | 'callout'
  | 'container'
  | 'close-container'
  | 'background-image'
  | 'stats-bars'
  | 'profile-card'
  | 'feature-grid';

interface FontConfig {
  enabled: boolean;
  family: string;
  size: number;
}

interface TextStyle {
  color: string;
  noStroke: boolean;
  strokeThickness?: number;
  font: FontConfig;
}

interface Header {
  emoji: string;
  name: string;
  nameStyle: TextStyle;
  label: string;
  labelStyle: TextStyle;
  align: Align;
}

interface Chrome {
  hdrOn: boolean;
  hdrEnabled: boolean;
  gradOn: boolean;
  barOn: boolean;
  borderOn: boolean;
  bgOn: boolean;
  groupBorder: boolean;
  groupBg: boolean;
  groupDivider: boolean;
  groupDividerStyle: 'dashed' | 'gradient';
  longHeader: boolean;
  longInside: boolean;
  /* colours */
  c1: string;
  c2: string;
  cBar: string;
  cBorder: string;
  cBg: string;
  cTxt: string;
  cGroup: string;
  cGroupBg: string;
  cGroupDivider: string;
  /* font */
  font: string;
  size: number;
  stroke: number;
  strokeCol: string;
  shadowCol: string;
}

interface Floating {
  enabled: boolean;
  url: string;
  height: number;
  pos: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

interface StatBar {
  name: string;
  value: number;
  maxValue?: number;
  color?: string;
}

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface Section {
  id: string;
  type: SectType;
  emoji?: string;
  label?: string;
  labelStyle: TextStyle;
  content?: string;
  contentStyle: TextStyle;
  align?: Align;
  bubbleColor?: string;
  stripeColor: string;
  // Image gallery support
  images?: Array<{
    url: string;
    alt?: string;
    caption?: string;
  }>;
  // Type-specific styling
  dividerColor?: string;
  dividerStyle?: 'dashed' | 'gradient';
  quoteColor?: string;
  calloutColor?: string;
  calloutBgColor?: string;
  traitBgColor?: string;
  statsBgColor?: string;
  statsUndefinedText?: string;
  groupBorderColor?: string;
  groupBgColor?: string;
  groupHeaderBg?: string;
  // Container properties
  containerStyle?: 'quote' | 'callout' | 'box' | 'panel';
  containerColor?: string;
  containerBgColor?: string;
  // Background image properties
  backgroundUrl?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  minHeight?: number;
  // Stats bars properties
  statBars?: StatBar[];
  // Profile card properties
  profileImage?: string;
  profileBadges?: string[];
  // Feature grid properties
  features?: FeatureItem[];
  gridColumns?: number;
}

const fontOptions = [
  { value: "'Trebuchet MS',sans-serif", label: "Trebuchet" },
  { value: "'Cinzel',serif", label: "Cinzel" },
  { value: "'Roboto',sans-serif", label: "Roboto" },
  { value: "'Courier New',monospace", label: "Courier" },
  { value: "'Inter',sans-serif", label: "Inter" },
  { value: "'Poppins',sans-serif", label: "Poppins" },
  { value: "'Orbitron',sans-serif", label: "Orbitron" }
];

/* 
   Component
 */
const CardEditor: React.FC = () => {
  const uid = useId();
  const makeId = () => uid + Math.random().toString(36).slice(2);

  const defaultTextStyle = (): TextStyle => ({
    color: '#ffffff',
    noStroke: true,
    strokeThickness: 0.5,
    font: { enabled: false, family: "'Trebuchet MS',sans-serif", size: 16 }
  });

  /*  state  */
  const [tab, setTab] = useState<'gen' | 'float' | 'style' | 'markup'>('gen');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [header, setHeader] = useState<Header>({
    emoji: '🎭',
    name: 'Character Card',
    nameStyle: defaultTextStyle(),
    label: 'Example Card',
    labelStyle: defaultTextStyle(),
    align: 'center'
  });

  const [chrome, setChrome] = useState<Chrome>({
  hdrOn: true, hdrEnabled: true, gradOn: true, barOn: true, borderOn: true, bgOn: true,
  groupBorder: true, groupBg: true, groupDivider: true, groupDividerStyle: 'gradient',
  longHeader: false, longInside: false,
  c1:'#FF9A00', c2:'#FF6600', cBar:'#FF3300', cBorder:'#FF9A00',
  cBg:'#1A1A1A', cTxt:'#ffffff', cGroup:'#FF9A00', cGroupBg:'#2A2A2A', cGroupDivider:'#FF9A00',
  font:"'Trebuchet MS',sans-serif", size:30, stroke:0.5,
  strokeCol:'#000000', shadowCol:'#000000'
});

  const [floating, setFloating] = useState<Floating>({
    enabled:false, url:'', height:30, pos:'bottom-right'
  });

  const [sections, setSections] = useState<Section[]>([
    { 
      id: makeId(), 
      type:'group', 
      emoji:'🎭', 
      label:'CHARACTER SHOWCASE',
      labelStyle: defaultTextStyle(),
      contentStyle: defaultTextStyle(),
      stripeColor: '#6b32a1',
      groupBorderColor: '#FF9A00',
      groupBgColor: '#2A2A2A',
      groupHeaderBg: '#1A1A1A'
    },
    { 
      id: makeId(), 
      type:'background-image', 
      label: 'Character Portrait',
      content:'An atmospheric character showcase with overlay text.',
      backgroundUrl: 'https://picsum.photos/800/500?random=1001',
      overlayColor: '#1f1f1f',
      overlayOpacity: 60,
      minHeight: 500,
      labelStyle: { color: '#ffffff', noStroke: true, strokeThickness: 0.5, font: { enabled: true, family: "'Cinzel',serif", size: 24 } },
      contentStyle: { color: '#ffffff', noStroke: true, strokeThickness: 0.5, font: { enabled: true, family: "'Inter',sans-serif", size: 16 } },
      stripeColor: '#274b8e'
    },
    { 
      id: makeId(), 
      type:'close-group',
      labelStyle: defaultTextStyle(),
      contentStyle: defaultTextStyle(),
      stripeColor: '#8e2733'
    },
    { 
      id: makeId(), 
      type:'stats-bars', 
      emoji: '📊',
      label:'Ability Scores', 
      content: 'Strength,Intelligence,Charisma,Wisdom',
      statBars: [
        { name: 'Strength', value: 85, maxValue: 100, color: '#e74c3c' },
        { name: 'Intelligence', value: 92, maxValue: 100, color: '#3498db' },
        { name: 'Charisma', value: 78, maxValue: 100, color: '#9b59b6' },
        { name: 'Wisdom', value: 65, maxValue: 100, color: '#2ecc71' }
      ],
      labelStyle: { color: '#FF9A00', noStroke: true, strokeThickness: 0.5, font: { enabled: true, family: "'Inter',sans-serif", size: 20 } },
      contentStyle: defaultTextStyle(),
      stripeColor: '#6b32a1'
    }
  ]);

  /*  helpers  */
  const move = (id:string, dir:'up'|'down') => {
    setSections(s => {
      const idx = s.findIndex(x=>x.id===id);
      if(idx<0) return s;
      const tgt = dir==='up' ? idx-1 : idx+1;
      if(tgt<0||tgt>=s.length) return s;
      const copy=[...s];
      [copy[idx],copy[tgt]]=[copy[tgt],copy[idx]];
      
      // Scroll to follow the moved section
      setTimeout(() => {
        const movedElement = document.querySelector(`[data-section-id="${id}"]`) as HTMLElement;
        
        if (movedElement) {
          movedElement.style.transform = 'scale(1.02)';
          movedElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest' 
          });
          movedElement.classList.add('ring-2', 'ring-blue-400', 'ring-opacity-75');
          
          setTimeout(() => {
            movedElement.style.transform = 'scale(1)';
            movedElement.classList.remove('ring-2', 'ring-blue-400', 'ring-opacity-75');
          }, 1000);
        }
      }, 50);
      
      return copy;
    });
  };

  const addSection = () => {
    const colors = ['#6b32a1', '#274b8e', '#8e2733'];
    const newColor = colors[sections.length % 3];
    
    setSections(s => [
      ...s,
      { 
        id:makeId(), 
        type:'normal', 
        content:'New content...',
        labelStyle: defaultTextStyle(),
        contentStyle: defaultTextStyle(),
        stripeColor: newColor,
        // Default type-specific colors
        dividerColor: chrome.c1,
        dividerStyle: 'gradient',
        quoteColor: chrome.c1,
        calloutColor: chrome.c1,
        calloutBgColor: chrome.c1 + '22',
        traitBgColor: chrome.c1,
        statsBgColor: 'rgba(0,0,0,0.3)',
        statsUndefinedText: '',
        groupBorderColor: chrome.cGroup,
        groupBgColor: chrome.cGroupBg,
        groupHeaderBg: chrome.cGroupBg,
        // Container defaults
        containerStyle: 'quote',
        containerColor: chrome.c1,
        containerBgColor: chrome.c1 + '22',
        // New type defaults
        overlayColor: '#1f1f1f',
        overlayOpacity: 60,
        minHeight: 300,
        statBars: [],
        features: [],
        gridColumns: 2,
        profileBadges: [],
        profileImage: ''
      }
    ]);
  };

  const updateSection = (id:string, patch:Partial<Section>) =>
    setSections(s => s.map(sec=>sec.id===id?{...sec,...patch}:sec));

  const removeSection = (id:string) =>
    setSections(s=>s.filter(sec=>sec.id!==id));

  const addImageToSection = (sectionId: string) => {
    updateSection(sectionId, {
      images: [
        ...(sections.find(s => s.id === sectionId)?.images || []),
        {
          url: 'https://picsum.photos/400/300?random=' + Math.floor(Math.random() * 1000),
          alt: 'New Image',
          caption: ''
        }
      ]
    });
  };

  /*  ENHANCED preview HTML generator with new section types  */
  const buildPreview = (): string => {
  const stroke = chrome.stroke ? `-webkit-text-stroke:${chrome.stroke}px ${chrome.strokeCol}` : '';
  
  // Clean text style generation
  const getTextStyle = (style: TextStyle, includeStroke: boolean = true) => {
    const styles: string[] = [];
    
    if (style.font.enabled) {
      if (style.font.family) styles.push(`font-family:${style.font.family}`);
      if (style.font.size) styles.push(`font-size:${style.font.size}px`);
    }
    
    styles.push(`color:${style.color}`);
    
    if (includeStroke && !style.noStroke) {
      const thickness = style.strokeThickness ?? chrome.stroke;
      if (thickness > 0) {
        styles.push(`-webkit-text-stroke:${thickness}px ${chrome.strokeCol}`);
      }
    }
    
    return styles.join(';');
  };

  // Clean content to prevent HTML injection and stray content
  const cleanContent = (content: string) => {
    if (!content) return '';
    return content
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&lt;br&gt;/gi, '<br>')
      .replace(/&lt;\/br&gt;/gi, '')
      .replace(/&lt;code&gt;.*?&lt;\/code&gt;/gi, '') // Remove any code tags
      .replace(/&lt;script.*?&lt;\/script&gt;/gi, '') // Remove any script tags
      .trim();
  };

  const baseStyle = `font-family:${chrome.font};font-size:${chrome.size}px;font-weight:900;text-shadow:0 0 4px ${chrome.shadowCol}`;
  
  const hBG = chrome.hdrOn
    ? chrome.gradOn
      ? `linear-gradient(120deg,${chrome.c1},${chrome.c2})`
      : chrome.c1
    : 'transparent';
  const bar = chrome.barOn ? `border-left:4px solid ${chrome.cBar};` : '';
  
  
  const getAlignmentStyles = (align: Align) => {
    const flexAlign = {
      left: 'flex-start',
      center: 'center', 
      right: 'flex-end'
    }[align];
    
    return {
      containerAlign: flexAlign,
      textAlign: align,
      justifyContent: flexAlign
    };
  };

  const headerAlignment = getAlignmentStyles(header.align);

  // Header width based on longHeader setting - CORRECTED VALUES
  const headerMaxWidth = chrome.longHeader ? '1200px' : '800px';
  const headerWidth = chrome.longHeader ? '100%' : 'auto';

  // Header - always render but hide when disabled to maintain HTML structure
  const headerVisibility = chrome.hdrEnabled 
    ? `background:${hBG};padding:18px;border-radius:8px 8px 0 0;max-width:${headerMaxWidth};width:${headerWidth};margin:0 auto;${chrome.barOn ? `border-left:4px solid ${chrome.cBar};` : ''}`
    : `background:transparent;padding:0;margin:0 auto;height:0;overflow:hidden;opacity:0;max-width:${headerMaxWidth};width:${headerWidth};`;
    
  const headerContentVisibility = chrome.hdrEnabled 
    ? `display:flex;flex-direction:column;gap:4px;align-items:${headerAlignment.containerAlign};text-align:${headerAlignment.textAlign};${chrome.barOn ? 'margin-left:-4px;' : ''}`
    : `display:none;`;


  const headerHtml = `
<div style="${headerVisibility}">
  <div style="${headerContentVisibility}">
    <div style="display:flex;gap:6px;align-items:center;justify-content:${headerAlignment.justifyContent};">
      ${chrome.hdrEnabled && header.emoji ? `<span style="font-size:${chrome.size}px;">${header.emoji}</span>` : ''}
      ${chrome.hdrEnabled ? `<span style="${baseStyle};${getTextStyle(header.nameStyle)}">${header.name}</span>` : ''}
    </div>
    ${chrome.hdrEnabled && header.label ? `<span style="${baseStyle};${getTextStyle(header.labelStyle)};font-weight:700;">${header.label}</span>` : ""}
  </div>
</div>`;

  // Body width based on longInside setting - CORRECTED VALUES
  const bodyMaxWidth = chrome.longInside ? '1200px' : '800px';

  // Fixed body styling with proper conditional logic
  let bodyStyles = [];
  if (chrome.bgOn) {
    bodyStyles.push(`background:${chrome.cBg}`);
  }
  bodyStyles.push(`color:${chrome.cTxt}`);
  bodyStyles.push(`max-width:${bodyMaxWidth}`);
  bodyStyles.push(`margin:0 auto`);
  bodyStyles.push(`padding:20px`);
  
  if (chrome.borderOn) {
    bodyStyles.push(`border:4px solid ${chrome.cBorder}`);
    if (chrome.hdrEnabled) {
      bodyStyles.push(`border-top:none`);
      bodyStyles.push(`border-radius:0 0 8px 8px`);
    } else {
      bodyStyles.push(`border-radius:8px`);
    }
  } else {
    if (chrome.hdrEnabled) {
      bodyStyles.push(`border-radius:0 0 8px 8px`);
    } else {
      bodyStyles.push(`border-radius:8px`);
    }
  }

  const bodyStart = `<div style="${bodyStyles.join(';')};">`;
  let body = bodyStart;
  let groupOpen = false;
  let containerOpen = false;
  
  const closeGroup = () => {
    if(groupOpen){
      if (chrome.groupDivider) {
        const dividerHTML = chrome.groupDividerStyle === 'dashed' 
          ? `<hr style="border:1px dashed ${chrome.cGroupDivider};margin:30px 0;">`
          : `<hr style="border:none;height:2px;background:linear-gradient(90deg,transparent,${chrome.cGroupDivider},transparent);margin:30px 0;">`;
        body += `</div>${dividerHTML}`;
      } else {
        body += `</div>`;
      }
      groupOpen=false;
    }
  };

  const closeContainer = () => {
    if(containerOpen){
      body += `</div>`;
      containerOpen=false;
    }
  };

  // Clean image gallery renderer
  const renderImageGallery = (images: Array<{url: string, alt?: string, caption?: string}>) => {
    if (!images || images.length === 0) return '';
    
    return `<div style="margin:15px 0;">
      ${images.map(img => `
        <div style="margin:10px 0;text-align:center;">
          <img src="${img.url}" alt="${img.alt || 'Image'}" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
          ${img.caption ? `<div style="margin-top:8px;font-style:italic;font-size:14px;opacity:0.8;">${img.caption}</div>` : ''}
        </div>
      `).join('')}
    </div>`;
  };

  sections.forEach(sec=>{
    const {type,emoji,label,content,bubbleColor='#007aff',align='left'} = sec;

    if(type==='close-group'){ closeGroup(); return; }
    if(type==='close-container'){ closeContainer(); return; }

    if(type==='group'){
      closeGroup();
      closeContainer();
      const groupBorderColor = sec.groupBorderColor || chrome.cGroup;
      const groupBgColor = sec.groupBgColor || chrome.cGroupBg;
      const groupHeaderBg = sec.groupHeaderBg || chrome.cGroupBg;
      
      body += `<div style="border:${chrome.groupBorder?`3px solid ${groupBorderColor}`:'none'};padding:0;margin:20px auto;max-width:700px;background:${chrome.groupBg?groupBgColor:'transparent'};border-radius:15px;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
                 <div style="background:${chrome.groupBg?groupHeaderBg:groupBgColor};padding:20px;border-radius:15px 15px 0 0;">
                   <h2 style="${baseStyle};${getTextStyle(sec.labelStyle)};font-weight:bold;text-align:center;margin:0;">
                     ${emoji?emoji+' ':''}${label||''}
                   </h2>
                 </div>
                 <div style="padding:20px;background:${chrome.groupBg?groupBgColor:'transparent'};border-radius:0 0 15px 15px;">`;
      groupOpen=true;
      return;
    }

    if(type==='container'){
      closeContainer();
      const containerStyle = sec.containerStyle || 'quote';
      const containerColor = sec.containerColor || chrome.c1;
      const containerBgColor = sec.containerBgColor || chrome.c1 + '22';
      const containerAlignment = getAlignmentStyles(align || 'left');

      if(containerStyle === 'quote') {
        body += `<blockquote style="border-left:4px solid ${containerColor};margin:20px 0;padding:15px 20px;background:rgba(255,255,255,0.05);border-radius:0 8px 8px 0;font-style:italic;">
                   ${label ? `<div style="${getTextStyle(sec.labelStyle, false)};font-weight:bold;margin-bottom:10px;font-style:normal;text-align:${containerAlignment.textAlign};">${emoji?emoji+' ':''}${label}</div>` : ''}`;
      } else if(containerStyle === 'callout') {
        body += `<div style="background:${containerBgColor};border:1px solid ${containerColor};border-radius:12px;padding:20px;margin:15px 0;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
                   ${label ? `<h4 style="${getTextStyle(sec.labelStyle)};margin:0 0 10px 0;font-weight:bold;text-align:${containerAlignment.textAlign};">${emoji?emoji+' ':''}${label}</h4>` : ''}`;
      } else if(containerStyle === 'box') {
        body += `<div style="border:2px solid ${containerColor};background:${containerBgColor};border-radius:8px;padding:15px;margin:15px 0;">
                   ${label ? `<h4 style="${getTextStyle(sec.labelStyle, false)};margin:0 0 10px 0;font-weight:bold;text-align:${containerAlignment.textAlign};">${emoji?emoji+' ':''}${label}</h4>` : ''}`;
      } else if(containerStyle === 'panel') {
        body += `<div style="background:${containerBgColor};border-left:4px solid ${containerColor};padding:15px 20px;margin:15px 0;border-radius:0 8px 8px 0;">
                   ${label ? `<h4 style="${getTextStyle(sec.labelStyle, false)};margin:0 0 10px 0;font-weight:bold;text-align:${containerAlignment.textAlign};">${emoji?emoji+' ':''}${label}</h4>` : ''}`;
      }
      containerOpen=true;
      return;
    }

    // NEW: Background Image Section
    if(type==='background-image'){
      const backgroundUrl = sec.backgroundUrl || '';
      const overlayColor = sec.overlayColor || '#1f1f1f';
      const overlayOpacity = (sec.overlayOpacity || 60) / 100;
      const minHeight = sec.minHeight || 300;
      const sectionAlignment = getAlignmentStyles(align || 'center');
      
      if(backgroundUrl){
        const cleanedContent = content ? content.replace(/\n/g,'<br>') : '';
        body += `<div style="background-image:url('${backgroundUrl}');background-size:cover;background-position:center;background-color:${chrome.cBg};border:2px solid ${chrome.cBorder};border-radius:12px;padding:20px;margin-bottom:25px;min-height:${minHeight}px;position:relative;">
                   <div style="position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(${parseInt(overlayColor.slice(1,3),16)},${parseInt(overlayColor.slice(3,5),16)},${parseInt(overlayColor.slice(5,7),16)},${overlayOpacity});border-radius:10px;"></div>
                   <div style="position:relative;z-index:1;text-align:${sectionAlignment.textAlign};">
                     ${label ? `<h3 style="${getTextStyle(sec.labelStyle)};margin-bottom:15px;">${emoji?emoji+' ':''}${label}</h3>` : ''}
                     ${cleanedContent ? `<div style="${getTextStyle(sec.contentStyle, false)};line-height:1.6;">${cleanedContent}</div>` : ''}
                     ${renderImageGallery(sec.images || [])}
                   </div>
                 </div>`;
      }
      return;
    }

    // NEW: Stats Bars Section
    if(type==='stats-bars'){
      const statBars = sec.statBars || [];
      const sectionAlignment = getAlignmentStyles(align || 'left');
      const sectionMargin = containerOpen ? 'margin:10px 0;' : 'margin:15px 0;';
      
      if(statBars.length > 0){
        body += `<div style="background:rgba(0,0,0,0.3);border-radius:12px;padding:20px;${sectionMargin}">
                   ${label ? `<h3 style="${getTextStyle(sec.labelStyle)};margin:0 0 20px 0;text-align:${sectionAlignment.textAlign};">${emoji?emoji+' ':''}${label}</h3>` : ''}
                   <div style="display:grid;gap:15px;">
                     ${statBars.map(stat => {
                       const percentage = ((stat.value / (stat.maxValue || 100)) * 100);
                       const color = stat.color || chrome.c1;
                       return `<div style="display:flex;flex-direction:column;gap:5px;">
                                 <div style="display:flex;justify-content:space-between;align-items:center;">
                                   <span style="${getTextStyle(sec.contentStyle, false)};font-weight:bold;">${stat.name}</span>
                                   <span style="${getTextStyle(sec.contentStyle, false)};font-size:14px;opacity:0.8;">${stat.value}/${stat.maxValue || 100}</span>
                                 </div>
                                 <div style="background:rgba(255,255,255,0.1);border-radius:10px;height:12px;overflow:hidden;">
                                   <div style="width:${percentage}%;height:100%;background:${color};border-radius:10px;transition:width 0.3s ease;"></div>
                                 </div>
                               </div>`;
                     }).join('')}
                   </div>
                   ${renderImageGallery(sec.images || [])}
                 </div>`;
      }
      return;
    }

    // NEW: Profile Card Section
    if(type==='profile-card'){
      const profileImage = sec.profileImage || '';
      const badges = sec.profileBadges || [];
      const sectionAlignment = getAlignmentStyles(align || 'center');
      const sectionMargin = containerOpen ? 'margin:10px 0;' : 'margin:15px 0;';
      
      body += `<div style="background:linear-gradient(135deg,${chrome.c1}22,${chrome.c2}22);border:2px solid ${chrome.c1};border-radius:20px;padding:25px;${sectionMargin}text-align:${sectionAlignment.textAlign};">
                 ${profileImage ? `<img src="${profileImage}" alt="Profile" style="width:120px;height:120px;border-radius:50%;border:4px solid ${chrome.c1};margin-bottom:15px;object-fit:cover;">` : ''}
                 ${label ? `<h2 style="${getTextStyle(sec.labelStyle)};margin:0 0 10px 0;">${emoji?emoji+' ':''}${label}</h2>` : ''}
                 ${content ? `<p style="${getTextStyle(sec.contentStyle, false)};margin:0 0 15px 0;line-height:1.5;">${content.replace(/\n/g,'<br>')}</p>` : ''}
                 ${badges.length > 0 ? `<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:${sectionAlignment.justifyContent};margin-top:15px;">
                   ${badges.map(badge => `<span style="background:${chrome.c1};color:white;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:bold;">${badge}</span>`).join('')}
                 </div>` : ''}
                 ${renderImageGallery(sec.images || [])}
               </div>`;
      return;
    }

    // NEW: Feature Grid Section - Simplified for chub compatibility
    if(type==='feature-grid'){
      const features = sec.features || [];
      const gridCols = sec.gridColumns || 2;
      const sectionAlignment = getAlignmentStyles(align || 'left');
      const sectionMargin = containerOpen ? 'margin:10px 0;' : 'margin:15px 0;';
      
      if(features.length > 0){
        body += `<div style="${sectionMargin}">
                   ${label ? `<h3 style="${getTextStyle(sec.labelStyle)};margin:0 0 20px 0;text-align:${sectionAlignment.textAlign};">${emoji?emoji+' ':''}${label}</h3>` : ''}
                   <div style="display:block;">`;
        
        // Generate rows
        for(let i = 0; i < features.length; i += gridCols) {
          body += '<div style="display:block;margin-bottom:20px;">';
          
          for(let j = 0; j < gridCols && (i + j) < features.length; j++) {
            const feature = features[i + j];
            const width = 100 / gridCols;
            const marginRight = j < gridCols - 1 ? '2%' : '0';
            
            body += `<div style="display:inline-block;width:${width - 2}%;margin-right:${marginRight};vertical-align:top;background:rgba(255,255,255,0.05);border:1px solid ${chrome.c1}33;border-radius:12px;padding:20px;text-align:center;box-sizing:border-box;">
                       <div style="font-size:48px;margin-bottom:12px;">${feature.icon}</div>
                       <h4 style="${getTextStyle(sec.labelStyle, false)};margin:0 0 8px 0;font-size:18px;">${feature.title}</h4>
                       <p style="${getTextStyle(sec.contentStyle, false)};margin:0;font-size:14px;opacity:0.8;line-height:1.4;">${feature.description}</p>
                     </div>`;
          }
          
          body += '</div>';
        }
        
        body += `</div>
                 ${renderImageGallery(sec.images || [])}
               </div>`;
      }
      return;
    }

    // 1. HTML - Raw HTML content (with safety checks)
    if(type==='html'){
      if (content) {
        // Remove potentially problematic tags that could break rendering
        const cleanedHtml = content
          .replace(/<code[^>]*>.*?<\/code>/gi, '') // Remove code tags
          .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
          .replace(/<style[^>]*>.*?<\/style>/gi, ''); // Remove style tags
        body += cleanedHtml;
      }
      return;
    }

    // 2. Dividers
    if(type==='divider'){
      const dividerColor = sec.dividerColor || chrome.c1;
      const dividerHTML = sec.dividerStyle === 'dashed'
        ? `<hr style="border:1px dashed ${dividerColor};margin:30px 0;">`
        : `<hr style="border:none;height:2px;background:linear-gradient(90deg,transparent,${dividerColor},transparent);margin:30px 0;">`;
      body += dividerHTML;
      return;
    }

    // 3. Images
    if(type==='image'){
      const sectionAlignment = getAlignmentStyles(align || 'center');
      if((content && content.trim()) || (sec.images && sec.images.length > 0)){
        body += `<div style="text-align:${sectionAlignment.textAlign};margin:20px 0;">
                   ${label && label.trim() ? `<h4 style="margin:0 0 10px 0;text-align:${sectionAlignment.textAlign};">${emoji?emoji+' ':''}${label}</h4>` : ''}`;
        
        if(content && content.trim()){
          body += `<img src="${content}" alt="${label || 'Image'}" style="max-width:100%;height:auto;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);">`;
        }
        
        body += renderImageGallery(sec.images || []);
        body += `</div>`;
      }
      return;
    }

    // 4. Bubble Messages
    if(type === 'bubble-left' || type === 'bubble-right'){
      if(content && content.trim()){
        const just = type==='bubble-left'?'flex-start':'flex-end';
        const containerMargin = containerOpen ? 'margin:10px 0;' : 'margin-bottom:15px;';
        const cleanedContent = content.replace(/\n/g,'<br>');
        body += `<div style="${containerMargin}display:flex;justify-content:${just};padding:0 ${containerOpen ? '10px' : '20px'};">
                   <div style="background:${bubbleColor};padding:12px 18px;border-radius:18px;max-width:70%;word-wrap:break-word;color:white;${getTextStyle(sec.contentStyle, false)}">${cleanedContent}</div>
                 </div>`;
        
        if(sec.images && sec.images.length > 0){
          body += `<div style="display:flex;justify-content:${just};margin:10px 0;">
                     <div style="max-width:70%;">
                       ${renderImageGallery(sec.images)}
                     </div>
                   </div>`;
        }
      }
      return;
    }

    // 5. Quote Blocks
    if(type==='quote'){
      if(content && content.trim()){
        const quoteColor = sec.quoteColor || chrome.c1;
        const quoteMargin = containerOpen ? 'margin:15px 0;' : 'margin:20px 0;';
        const quoteAlignment = getAlignmentStyles(align || 'left');
        const cleanedContent = content.replace(/\n/g,'<br>');
        body += `<blockquote style="border-left:4px solid ${quoteColor};${quoteMargin}padding:15px 20px;background:rgba(255,255,255,0.05);border-radius:0 8px 8px 0;font-style:italic;${getTextStyle(sec.contentStyle)};text-align:${quoteAlignment.textAlign};">
                   "${cleanedContent}"
                 </blockquote>`;
        
        if(sec.images && sec.images.length > 0){
          body += renderImageGallery(sec.images);
        }
      }
      return;
    }

    // 6. Callout Boxes
    if(type==='callout'){
      const hasLabel = label && label.trim();
      const hasContent = content && content.trim();
      const hasImages = sec.images && sec.images.length > 0;
      
      if(hasLabel || hasContent || hasImages){
        const calloutColor = sec.calloutColor || chrome.c1;
        const calloutBgColor = sec.calloutBgColor || chrome.c1 + '22';
        const calloutAlignment = getAlignmentStyles(align || 'left');
        const calloutMargin = containerOpen ? 'margin:10px 0;' : 'margin:15px 0;';
        
        body += `<div style="background:${calloutBgColor};border:1px solid ${calloutColor};border-radius:12px;padding:15px;${calloutMargin}box-shadow:0 2px 8px rgba(0,0,0,0.2);">`;
        
        if(hasLabel){
          body += `<h4 style="${getTextStyle(sec.labelStyle)};margin:0 0 10px 0;font-weight:bold;text-align:${calloutAlignment.textAlign};">${emoji?emoji+' ':''}${label}</h4>`;
        }
        
        if(hasContent){
          const cleanedContent = content.replace(/\n/g,'<br>');
          body += `<div style="${getTextStyle(sec.contentStyle, false)};text-align:${calloutAlignment.textAlign};">${cleanedContent}</div>`;
        }
        
        if(hasImages){
          body += renderImageGallery(sec.images);
        }
        
        body += `</div>`;
      }
      return;
    }

    // 7. Trait Tags
    if(type==='traits'){
      if(content && content.trim()){
        const traits = content.split(',').map(t => t.trim()).filter(t => t);
        if(traits.length > 0){
          const traitBgColor = sec.traitBgColor || chrome.c1;
          const traitMargin = containerOpen ? 'margin:10px 0;' : 'margin:15px 0;';
          const traitAlignment = getAlignmentStyles(align || 'left');
          body += `<div style="${traitMargin}">
                     ${label && label.trim() ? `<h4 style="margin:0 0 15px 0;text-align:${traitAlignment.textAlign};">${emoji?emoji+' ':''}${label}</h4>` : ''}
                     <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:${traitAlignment.justifyContent};">
                       ${traits.map(trait => `<span style="background:${traitBgColor};color:white;padding:4px 12px;border-radius:20px;font-size:14px;font-weight:500;">${trait}</span>`).join('')}
                     </div>
                   </div>`;
          
          if(sec.images && sec.images.length > 0){
            body += renderImageGallery(sec.images);
          }
        }
      }
      return;
    }

    // 8. Stats Blocks
    if(type==='stats'){
      if(content && content.trim()){
        const stats = content.split('\n').map(s => s.trim()).filter(s => s);
        if(stats.length > 0){
          const statsBgColor = sec.statsBgColor || 'rgba(0,0,0,0.3)';
          const statsAccentColor = sec.traitBgColor || chrome.c1;
          const undefinedText = sec.statsUndefinedText !== undefined ? sec.statsUndefinedText : '—';
          const statsMargin = containerOpen ? 'margin:10px 0;' : 'margin:15px 0;';
          const statsAlignment = getAlignmentStyles(align || 'left');
          
          body += `<div style="background:${statsBgColor};border-radius:8px;padding:15px;${statsMargin}">
                     ${label && label.trim() ? `<h4 style="margin:0 0 15px 0;text-align:${statsAlignment.textAlign};">${emoji?emoji+' ':''}${label}</h4>` : ''}
                     <div style="display:grid;gap:8px;">
                       ${stats.map(stat => {
                         const [name, ...valueParts] = stat.split(':');
                         const value = valueParts.join(':').trim();
                         const displayValue = stat.includes(':') 
                           ? (value || undefinedText)
                           : undefinedText;
                         return `<div style="display:flex;justify-content:space-between;align-items:center;">
                                   <span>${name}</span>
                                   <span style="font-weight:bold;color:${statsAccentColor};">${displayValue}</span>
                                 </div>`;
                       }).join('')}
                     </div>
                   </div>`;
          
          if(sec.images && sec.images.length > 0){
            body += renderImageGallery(sec.images);
          }
        }
      }
      return;
    }

    // 9. Regular Content
    const hasLabel = label && label.trim();
    const hasContent = content && content.trim();
    const hasImages = sec.images && sec.images.length > 0;
    const sectionAlignment = getAlignmentStyles(align || 'left');
    
    if(hasLabel){
      const headingMargin = containerOpen ? 'margin:15px 0 10px 0;' : 'margin:20px 0 10px 0;';
      body += `<h3 style="text-align:${sectionAlignment.textAlign};${getTextStyle(sec.labelStyle)};${headingMargin}font-weight:bold;">
                 ${emoji?emoji+' ':''}${label}
               </h3>`;
    }

    if(hasContent){
      const contentMargin = containerOpen ? 'margin:5px 0;' : 'margin:10px 0;';
      const cleanedContent = content.replace(/\n/g,'<br>');
      body += `<p style="${getTextStyle(sec.contentStyle, false)};text-align:${sectionAlignment.textAlign};${contentMargin}line-height:1.6;">${cleanedContent}</p>`;
    }
    
    if(hasImages){
      body += renderImageGallery(sec.images);
    }
  });
  
  closeGroup();
  closeContainer();
  body += '</div>';

  const float = floating.enabled && floating.url
    ? `<img src="${floating.url}" style="position:fixed;${floating.pos.includes('top')?'top:0;':'bottom:0;'}${floating.pos.includes('left')?'left:5px;':'right:5px;'}height:${floating.height}%;pointer-events:none;z-index:99;">`
    : '';

  return headerHtml + body + float;
};

  // Generate complete standalone HTML document
  const buildCompleteHTML = (): string => {
    const cardHTML = buildPreview();
    
    // Use body background only if enabled, otherwise transparent/default
    const bodyBg = chrome.bgOn ? chrome.cBg : 'transparent';
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${header.name} - Character Card</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: ${bodyBg};
            color: ${chrome.cTxt};
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card-container {
            max-width: 800px;
            width: 100%;
        }
        img {
            max-width: 100%;
            height: auto;
        }
        /* Fix for potential styling issues */
        * {
            box-sizing: border-box;
        }
        /* Better table layout for feature grids */
        .feature-table {
            width: 100%;
            border-spacing: 10px;
            border-collapse: separate;
        }
        .feature-cell {
            vertical-align: top;
            text-align: center;
            background: rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="card-container">
        ${cardHTML}
    </div>
</body>
</html>`;
  };

  const previewHtml = buildPreview();
  const completeHtml = buildCompleteHTML();

  const exportHtml = () => {
    const blob = new Blob([completeHtml],{type:'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'character-card.html';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const saveToFile = () => {
    const saveData = {
      header,
      chrome,
      floating,
      sections,
      version: '3.0',
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(saveData, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${header.name.replace(/[^a-z0-9]/gi, '_')}-card.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const loadFromFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.html,.htm';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            
            // Check file extension or content type
            if (file.name.toLowerCase().endsWith('.html') || file.name.toLowerCase().endsWith('.htm') || 
                content.trim().startsWith('<!DOCTYPE') || content.trim().startsWith('<html')) {
              // Parse as HTML
              parseHTMLToCard(content);
            } else {
              // Parse as JSON
              const data = JSON.parse(content);
              if (data.header && data.sections) {
                setHeader(data.header);
                setChrome(data.chrome || chrome);
                setFloating(data.floating || floating);
                setSections(data.sections);
              } else {
                alert('Invalid JSON format. Please make sure the file contains valid card data.');
              }
            }
          } catch (err) {
            console.error('Error loading file:', err);
            alert('Error loading file. Please check the file format and try again.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const [showMarkupModal, setShowMarkupModal] = useState(false);
  const [markupInput, setMarkupInput] = useState('');

  const loadFromMarkup = () => {
    if (!markupInput.trim()) {
      alert('Please paste some content to import.');
      return;
    }
    
    try {
      const trimmed = markupInput.trim();
      
      // Check if it's HTML (starts with <!DOCTYPE, <html, or contains HTML tags)
      if (trimmed.startsWith('<!DOCTYPE') || 
          trimmed.startsWith('<html') || 
          /<[^>]+>/g.test(trimmed)) {
        // Parse HTML to extract card data
        parseHTMLToCard(trimmed);
      } else {
        // Try to parse as JSON
        const data = JSON.parse(markupInput);
        if (data.header && data.sections) {
          setHeader(data.header);
          setChrome(data.chrome || chrome);
          setFloating(data.floating || floating);
          setSections(data.sections);
          setShowMarkupModal(false);
          setMarkupInput('');
          alert('JSON data loaded successfully!');
        } else {
          alert('Invalid JSON format. Please make sure the data contains valid card structure.');
        }
      }
    } catch (err) {
      console.error('Error parsing markup:', err);
      // For JSON parsing errors, provide more helpful message
      if (markupInput.trim().startsWith('{')) {
        alert('JSON parsing error. Please check the JSON syntax and try again.');
      } else {
        alert('Error parsing content. Please check the format and try again.');
      }
    }
  };

  // Basic HTML parser (simplified version)
  const parseHTMLToCard = (html: string) => {
    try {
      let markup = html.trim();
      if (/^<!DOCTYPE|^<html/i.test(markup)) {
        const doc = new DOMParser().parseFromString(markup, "text/html");
        markup = doc.querySelector(".card-container")?.innerHTML.trim() || doc.body?.innerHTML || markup;
      }
      
      // Create basic sections from HTML
      const newSections: Section[] = [
        {
          id: makeId(),
          type: 'normal',
          label: 'Imported Content',
          content: markup.replace(/<[^>]+>/g, '').trim(),
          labelStyle: defaultTextStyle(),
          contentStyle: defaultTextStyle(),
          stripeColor: '#6b32a1'
        }
      ];
      
      setSections(newSections);
      setShowMarkupModal(false);
      setMarkupInput("");
      alert("HTML imported successfully!");
      
    } catch (err) {
      console.error(err);
      alert("HTML parse error: " + (err as Error).message);
    }
  };

  const copyJSONToClipboard = () => {
    const saveData = {
      header,
      chrome,
      floating,
      sections,
      version: '3.0',
      timestamp: new Date().toISOString()
    };
    
    navigator.clipboard.writeText(JSON.stringify(saveData, null, 2));
  };

  const loadDemo = () => {
    const colors = ['#6b32a1', '#274b8e', '#8e2733', '#2d7d32', '#d32f2f'];
    
    // Enhanced chrome settings showcasing all features
  setChrome({
    hdrOn: true, 
    hdrEnabled: true,
    gradOn: true, 
    barOn: true, 
    borderOn: true, 
    bgOn: true,
    groupBorder: true, 
    groupBg: true, 
    groupDivider: true, 
    groupDividerStyle: 'gradient',
    longHeader: false,
    longInside: false,
    c1:'#7c3aed', 
    c2:'#1e1b4b', 
    cBar:'#a855f7', 
    cBorder:'#7c3aed',
    cBg:'#0f0a1a', 
    cTxt:'#FFFFFF', 
    cGroup:'#7c3aed', 
    cGroupBg:'#1e1b4b', 
    cGroupDivider:'#a855f7',
    font:"'Cinzel',serif", 
    size:32, 
    stroke:0.5,
    strokeCol:'#000000', 
    shadowCol:'#7c3aed'
  });



    setHeader({
      emoji: '📚',
      name: 'Seraphina Quillheart',
      nameStyle: {
        color: '#FFFFFF',
        noStroke: true,
        strokeThickness: 1,
        font: { enabled: true, family: "'Cinzel',serif", size: 36 }
      },
      label: 'Keeper of Living Tomes',
      labelStyle: {
        color: '#c4b5fd',
        noStroke: true,
        strokeThickness: 1,
        font: { enabled: true, family: "'Inter',sans-serif", size: 18 }
      },
      align: 'center'
    });

    setFloating({
      enabled: true,
      url: 'https://picsum.photos/300/400?random=777',
      height: 35,
      pos: 'bottom-right'
    });

    const demoSections: Section[] = [
      {
        id: makeId(),
        type: 'background-image',
        label: 'The Infinite Library',
        content: 'Guardian of books that contain entire worlds within their pages.\n\n"Every story ever written lives and breathes in my care. Would you like to step inside one?"',
        backgroundUrl: 'https://picsum.photos/800/500?random=3001',
        overlayColor: '#1e1b4b',
        overlayOpacity: 75,
        minHeight: 400,
        labelStyle: { color: '#c4b5fd', noStroke: true, strokeThickness: 0.5, font: { enabled: true, family: "'Cinzel',serif", size: 28 } },
        contentStyle: { color: '#ffffff', noStroke: true, font: { enabled: true, family: "'Inter',sans-serif", size: 16 } },
        stripeColor: colors[0],
        align: 'center'
      },
      
      {
        id: makeId(),
        type: 'profile-card',
        emoji: '📖',
        label: 'Seraphina Quillheart',
        content: 'Age: Timeless (appears 28)\nSpecialty: Interdimensional Library Science\nRare Ability: Can enter book worlds\n\nOnce a mortal scholar, she made a pact with ancient spirits to become the eternal guardian of stories that refuse to stay on the page.',
        profileImage: 'https://picsum.photos/200/200?random=3002',
        profileBadges: ['Master Librarian', 'World Walker', 'Story Keeper', 'Reality Bender'],
        labelStyle: { color: '#c4b5fd', noStroke: true, strokeThickness: 0.5, font: { enabled: true, family: "'Cinzel',serif", size: 24 } },
        contentStyle: { color: '#e5e7eb', noStroke: true, font: { enabled: true, family: "'Inter',sans-serif", size: 14 } },
        stripeColor: colors[1]
      },

      {
        id: makeId(),
        type: 'stats-bars',
        emoji: '⚡',
        label: 'Mystical Abilities',
        statBars: [
          { name: 'Book Realm Navigation', value: 95, maxValue: 100, color: '#7c3aed' },
          { name: 'Story Manipulation', value: 88, maxValue: 100, color: '#a855f7' },
          { name: 'Reality Anchoring', value: 82, maxValue: 100, color: '#c084fc' },
          { name: 'Forbidden Knowledge', value: 76, maxValue: 100, color: '#ddd6fe' },
          { name: 'Character Empathy', value: 92, maxValue: 100, color: '#8b5cf6' }
        ],
        labelStyle: { color: '#c4b5fd', noStroke: true, strokeThickness: 0.5, font: { enabled: true, family: "'Cinzel',serif", size: 20 } },
        contentStyle: { color: '#ffffff', noStroke: true, font: { enabled: true, family: "'Inter',sans-serif", size: 14 } },
        stripeColor: colors[2]
      },

      {
        id: makeId(),
        type: 'feature-grid',
        emoji: '✨',
        label: 'Mystical Services',
        features: [
          {
            icon: '🌍',
            title: 'World Walking',
            description: 'Guides visitors safely through book realms and alternate realities'
          },
          {
            icon: '📝',
            title: 'Story Weaving', 
            description: 'Can alter plot threads and character fates within living narratives'
          },
          {
            icon: '🔮',
            title: 'Future Reading',
            description: 'Glimpses possible endings by consulting prophetic manuscripts'
          },
          {
            icon: '⏰',
            title: 'Time Anchoring',
            description: 'Prevents paradoxes when stories bleed into reality'
          }
        ],
        gridColumns: 2,
        labelStyle: { color: '#c4b5fd', noStroke: true, strokeThickness: 0.5, font: { enabled: true, family: "'Cinzel',serif", size: 20 } },
        contentStyle: { color: '#e5e7eb', noStroke: true, font: { enabled: true, family: "'Inter',sans-serif", size: 13 } },
        stripeColor: colors[3]
      },

      {
        id: makeId(),
        type: 'callout',
        emoji: '📜',
        label: 'Ancient Catalog System',
        content: 'AKASHIC_LIBRARY_OS v∞.∞.∞ - Etheric Interface\n========================================\n> query_living_stories\nRetrieving active narratives...\n> access_restricted_section\nWarning: Reality fluctuation detected\n> authorize_world_entry [USER_ID]\nPortal stabilized. Safe passage granted.\n========================================\nMay your story find its true ending.',
        calloutColor: '#7c3aed',
        calloutBgColor: '#7c3aed22',
        labelStyle: { color: '#c4b5fd', noStroke: true, strokeThickness: 0.5, font: { enabled: true, family: "'Cinzel',serif", size: 18 } },
        contentStyle: { color: '#a855f7', noStroke: true, font: { enabled: true, family: "'Courier New',monospace", size: 12 } },
        stripeColor: colors[4]
      },

      {
        id: makeId(),
        type: 'group',
        emoji: '📚',
        label: 'Story Encounters',
        labelStyle: { color: '#ffffff', noStroke: true, strokeThickness: 0.5, font: { enabled: true, family: "'Cinzel',serif", size: 22 } },
        contentStyle: defaultTextStyle(),
        stripeColor: colors[0],
        groupBorderColor: '#7c3aed',
        groupBgColor: '#1e1b4b',
        groupHeaderBg: '#312e81'
      },

      {
        id: makeId(),
        type: 'bubble-left',
        content: '*Looks up from a book that\'s glowing with inner light, pages fluttering without wind* "Oh my! You\'ve wandered quite far from the main reading area. This particular tome contains a rather... active romance novel. The characters have been asking about you specifically."',
        bubbleColor: '#7c3aed',
        labelStyle: defaultTextStyle(),
        contentStyle: { color: '#ffffff', noStroke: true, font: { enabled: true, family: "'Inter',sans-serif", size: 14 } },
        stripeColor: colors[1]
      },

      {
        id: makeId(),
        type: 'bubble-left',
        content: '*Standing before a massive portal formed by floating book pages* "I sense you\'ve been having the same recurring dreams... That\'s because your story is calling to you from beyond the veil. Would you like me to help you find which book you truly belong in?"',
        bubbleColor: '#a855f7',
        labelStyle: defaultTextStyle(),
        contentStyle: { color: '#ffffff', noStroke: true, font: { enabled: true, family: "'Inter',sans-serif", size: 14 } },
        stripeColor: colors[2]
      },

      {
        id: makeId(),
        type: 'close-group',
        labelStyle: defaultTextStyle(),
        contentStyle: defaultTextStyle(),
        stripeColor: colors[3]
      }
    ];

    setSections(demoSections);
    alert('📚 Enhanced Demo Loaded!\n\nFeaturing Seraphina Quillheart:\n• Background Image with mystical overlay\n• Stats Bars with magical abilities\n• Profile Card with ethereal styling\n• Feature Grid for mystical services\n\nA completely unique character showcasing all new section types!');
  };

  const loadBlank = () => {
    const colors = ['#6b32a1', '#274b8e', '#8e2733'];
    
    setHeader({
      emoji: '',
      name: 'Character Card',
      nameStyle: defaultTextStyle(),
      label: 'Example Card',
      labelStyle: defaultTextStyle(),
      align: 'center'
    });
    
    setChrome({
    hdrOn: true, hdrEnabled: true, gradOn: true, barOn: true, borderOn: true, bgOn: true,
    groupBorder: true, groupBg: true, groupDivider: true, groupDividerStyle: 'gradient',
    longHeader: false, longInside: false,  // Add these defaults
    c1:'#FF9A00', c2:'#FF6600', cBar:'#FF3300', cBorder:'#FF9A00',
    cBg:'#1A1A1A', cTxt:'#ffffff', cGroup:'#FF9A00', cGroupBg:'#2A2A2A', cGroupDivider:'#FF9A00',
    font:"'Trebuchet MS',sans-serif", size:30, stroke:0.5,
    strokeCol:'#000000', shadowCol:'#000000'
  });

    
    setFloating({
      enabled: false, url: '', height: 30, pos: 'bottom-right'
    });
    
    setSections([
      { 
        id: makeId(), 
        type:'normal', 
        label:'Welcome', 
        content:'This is a blank character card template. Add sections below!',
        labelStyle: defaultTextStyle(),
        contentStyle: defaultTextStyle(),
        stripeColor: colors[0]
      }
    ]);
  };

  /*  UI helpers  */
  const colour = (key: keyof Chrome, disabled = false) => (
    <input
      type="color"
      value={(chrome as any)[key]}
      onChange={e=>setChrome({...chrome,[key]:e.target.value})}
      disabled={disabled}
      className={`w-8 h-8 rounded border-none ${disabled ? 'opacity-35' : ''}`}
    />
  );

  const toggle = (key:keyof Chrome, label:string, colors?: (keyof Chrome)[]) => (
    <div className="flex items-center gap-2 mb-2">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={(chrome as any)[key]}
          onChange={e=>setChrome({...chrome,[key]:e.target.checked})}
        />
        <span>{label}</span>
      </label>
      {colors?.map(colorKey => 
        <div key={colorKey}>{colour(colorKey, !(chrome as any)[key])}</div>
      )}
    </div>
  );

  const textStyleControls = (
    style: TextStyle, 
    onChange: (style: TextStyle) => void, 
    label: string
  ) => (
    <div className="space-y-2 p-2 bg-black/20 rounded">
      <h5 className="text-sm font-medium">{label}</h5>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={style.color}
          onChange={e => onChange({...style, color: e.target.value})}
          className="w-6 h-6 rounded"
        />
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={style.noStroke}
            onChange={e => onChange({...style, noStroke: e.target.checked})}
          />
          <span>No outline</span>
        </label>
        {!style.noStroke && (
          <>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={style.strokeThickness ?? 0.5}
              onChange={e => onChange({...style, strokeThickness: +e.target.value})}
              placeholder="0.5"
              className="w-12 text-xs p-1 bg-black/40 rounded"
              title="Outline thickness"
            />
            <span className="text-xs opacity-75">px</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1 text-xs">
          <input
            type="checkbox"
            checked={style.font.enabled}
            onChange={e => onChange({...style, font: {...style.font, enabled: e.target.checked}})}
          />
          <span>Custom font</span>
        </label>
        {style.font.enabled && (
          <>
            <select
              value={style.font.family}
              onChange={e => onChange({...style, font: {...style.font, family: e.target.value}})}
              className="text-xs p-1 bg-black/40 rounded"
            >
              {fontOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
            <input
              type="number"
              min={8}
              max={72}
              value={style.font.size}
              onChange={e => onChange({...style, font: {...style.font, size: +e.target.value}})}
              placeholder="px"
              className="w-16 text-xs p-1 bg-black/40 rounded"
            />
          </>
        )}
      </div>
    </div>
  );

  const bgClass = theme === 'dark' 
    ? 'bg-gray-900 text-gray-100' 
    : 'bg-gray-100 text-gray-900';

  const cardClass = theme === 'dark'
    ? 'bg-gray-800 border-gray-700'
    : 'bg-white border-gray-300';

  const inputClass = theme === 'dark'
    ? 'bg-gray-700 border-gray-600 text-gray-100'
    : 'bg-white border-gray-300 text-gray-900';

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Toolbar */}
      <div className={`${cardClass} border-b p-3 flex items-center gap-2`}>
        <button 
          onClick={loadDemo}
          className={`${inputClass} border rounded px-3 py-1 hover:bg-blue-600 hover:text-white transition-colors`}
        >
          🚀 Load Enhanced Demo
        </button>
        <button 
          onClick={loadBlank}
          className={`${inputClass} border rounded px-3 py-1 hover:bg-gray-500 hover:text-white transition-colors`}
        >
          📄 New Blank
        </button>
        <div className="flex-1"/>
        <button 
          onClick={loadFromFile}
          className={`${inputClass} border rounded px-3 py-1 hover:bg-green-600 hover:text-white transition-colors`}
        >
          📁 Load File
        </button>
        <button 
          onClick={() => setShowMarkupModal(true)}
          className={`${inputClass} border rounded px-3 py-1 hover:bg-purple-600 hover:text-white transition-colors`}
        >
          📝 Load Markup
        </button>
        <button 
          onClick={saveToFile}
          className={`${inputClass} border rounded px-3 py-1 hover:bg-blue-600 hover:text-white transition-colors`}
        >
          💾 Save
        </button>
        <button 
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          className={`${inputClass} border rounded px-3 py-1 hover:bg-yellow-600 hover:text-white transition-colors`}
        >
          {theme === 'dark' ? '☀️' : '🌙'} Theme
        </button>
        <button 
          onClick={copyJSONToClipboard}
          className={`${inputClass} border rounded px-3 py-1 hover:bg-indigo-600 hover:text-white transition-colors`}
        >
          📋 Copy JSON
        </button>
        <button 
          onClick={() => navigator.clipboard.writeText(completeHtml)}
          className={`${inputClass} border rounded px-3 py-1 hover:bg-orange-600 hover:text-white transition-colors`}
        >
          📄 Copy HTML
        </button>
        <button 
          onClick={exportHtml}
          className={`${inputClass} border rounded px-3 py-1 hover:bg-orange-600 hover:text-white transition-colors`}
        >
          💾 Export HTML
        </button>
      </div>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Left panel - Form */}
        <div className={`w-1/2 ${cardClass} border-r overflow-y-auto relative`}>
          {/* Tabs - Sticky */}
          <div className="flex border-b sticky top-0 z-10" style={{ backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff' }}>
            {[
              {key: 'gen', label: 'General'},
              {key: 'float', label: 'Floating'}, 
              {key: 'style', label: 'Styles'},
              {key: 'markup', label: 'Markup'}
            ].map(({key, label}) => (
              <button
                key={key}
                onClick={() => setTab(key as any)}
                className={`px-4 py-2 transition-colors ${tab === key 
                  ? 'bg-blue-600 text-white' 
                  : theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === 'gen' && (
              <>
                {/* Header Section */}
                <div className="mb-6">
                  <div className={`${cardClass} border rounded p-3 mb-3 cursor-pointer font-semibold sticky top-16 z-10`} style={{ backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb' }}>
                    🎨 Header
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          checked={chrome.hdrEnabled}
                          onChange={e => setChrome({...chrome, hdrEnabled: e.target.checked})}
                        />
                        <span className="font-medium">Enable Header</span>
                      </label>
                    </div>
                    
                    {chrome.hdrEnabled && (
                      <>
                        <div>
                          <label className="block text-sm font-medium mb-1">Emoji</label>
                          <input
                            maxLength={4}
                            value={header.emoji}
                            onChange={e => setHeader({...header, emoji: e.target.value})}
                            className={`w-full p-2 border rounded resize-x min-w-[100px] ${inputClass}`}
                            style={{ resize: 'horizontal' }}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input
                            value={header.name}
                            onChange={e => setHeader({...header, name: e.target.value})}
                            className={`w-full p-2 border rounded resize-x min-w-[150px] ${inputClass}`}
                            style={{ resize: 'horizontal' }}
                          />
                          {textStyleControls(
                            header.nameStyle,
                            (style) => setHeader({...header, nameStyle: style}),
                            "Name Style"
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Label</label>
                          <input
                            value={header.label}
                            onChange={e => setHeader({...header, label: e.target.value})}
                            className={`w-full p-2 border rounded resize-x min-w-[150px] ${inputClass}`}
                            style={{ resize: 'horizontal' }}
                          />
                          {textStyleControls(
                            header.labelStyle,
                            (style) => setHeader({...header, labelStyle: style}),
                            "Label Style"
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Alignment</label>
                          <select
                            value={header.align}
                            onChange={e => setHeader({...header, align: e.target.value as Align})}
                            className={`w-full p-2 border rounded ${inputClass}`}
                          >
                            <option value="left">left</option>
                            <option value="center">center</option>
                            <option value="right">right</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Sections */}
                <div>
                  <div className={`${cardClass} border rounded p-3 mb-3 cursor-pointer font-semibold sticky top-16 z-10`} style={{ backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb' }}>
                    📝 Sections
                  </div>
                  <div className="space-y-3 mb-4">
                    {sections.map((section, idx) => (
                      <div
                        key={section.id}
                        data-section-id={section.id}
                        className={`${cardClass} border rounded p-3 relative mb-3 transition-all duration-300`}
                        style={{
                          borderLeftWidth: '4px',
                          borderLeftStyle: 'solid',
                          borderLeftColor: section.stripeColor,
                          transition: 'transform 0.3s ease'
                        }}
                      >
                        {/* Control buttons */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <button
                            onClick={() => move(section.id, 'up')}
                            disabled={idx === 0}
                            className="w-5 h-5 bg-gray-600 text-white text-xs rounded-full disabled:opacity-50 hover:bg-gray-500"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => move(section.id, 'down')}
                            disabled={idx === sections.length - 1}
                            className="w-5 h-5 bg-gray-600 text-white text-xs rounded-full disabled:opacity-50 hover:bg-gray-500"
                          >
                            ↓
                          </button>
                        </div>
                        <button
                          onClick={() => removeSection(section.id)}
                          className="absolute top-2 right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full hover:bg-red-700"
                        >
                          ×
                        </button>

                        <div className="ml-12 mr-8 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-medium mb-1">Type</label>
                              <select
                                value={section.type}
                                onChange={e => updateSection(section.id, {type: e.target.value as SectType})}
                                className={`w-full p-1 border rounded text-xs ${inputClass}`}
                              >
                                <option value="normal">Paragraph</option>
                                <option value="heading">Heading</option>
                                <option value="bubble-left">Bubble Left</option>
                                <option value="bubble-right">Bubble Right</option>
                                <option value="group">Group Header</option>
                                <option value="close-group">Close Group</option>
                                <option value="quote">Quote Block</option>
                                <option value="callout">Callout Box</option>
                                <option value="container">Container Header</option>
                                <option value="close-container">Close Container</option>
                                <option value="traits">Trait Tags</option>
                                <option value="stats">Stats Block</option>
                                <option value="stats-bars">Stats Bars</option>
                                <option value="background-image">Background Image</option>
                                <option value="profile-card">Profile Card</option>
                                <option value="feature-grid">Feature Grid</option>
                                <option value="divider">Divider</option>
                                <option value="image">Image</option>
                                <option value="html">Raw HTML</option>
                              </select>
                            </div>
                            {section.type !== 'close-group' && section.type !== 'close-container' && (
                              <div>
                                <label className="block text-xs font-medium mb-1">Alignment</label>
                                <select
                                  value={section.align || 'left'}
                                  onChange={e => updateSection(section.id, {align: e.target.value as Align})}
                                  className={`w-full p-1 border rounded text-xs ${inputClass}`}
                                >
                                  <option value="left">left</option>
                                  <option value="center">center</option>
                                  <option value="right">right</option>
                                </select>
                              </div>
                            )}
                          </div>

                          {section.type !== 'close-group' && section.type !== 'close-container' && (
                            <div>
                              <label className="block text-xs font-medium mb-1">Emoji</label>
                              <input
                                maxLength={4}
                                value={section.emoji || ''}
                                onChange={e => updateSection(section.id, {emoji: e.target.value})}
                                className={`w-full p-1 border rounded text-sm resize-x min-w-[60px] ${inputClass}`}
                                style={{ resize: 'horizontal' }}
                              />
                            </div>
                          )}

                          <div>
                            <label className="block text-xs font-medium mb-1">Label/Title</label>
                            <input
                              value={section.label || ''}
                              onChange={e => updateSection(section.id, {label: e.target.value})}
                              className={`w-full p-1 border rounded text-sm resize-x min-w-[120px] ${inputClass}`}
                              style={{ resize: 'horizontal' }}
                            />
                            {textStyleControls(
                              section.labelStyle,
                              (style) => updateSection(section.id, {labelStyle: style}),
                              "Label Style"
                            )}
                          </div>

                          {section.type !== 'close-group' && section.type !== 'close-container' && (
                            <div>
                              <label className="block text-xs font-medium mb-1">Content</label>
                              <textarea
                                rows={3}
                                value={section.content || ''}
                                onChange={e => updateSection(section.id, {content: e.target.value})}
                                className={`w-full p-1 border rounded text-sm resize-both min-h-[60px] ${inputClass}`}
                                style={{ resize: 'both' }}
                              />
                              {textStyleControls(
                                section.contentStyle,
                                (style) => updateSection(section.id, {contentStyle: style}),
                                "Content Style"
                              )}
                            </div>
                          )}

                          {/* Background Image Controls */}
                          {section.type === 'background-image' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">🖼️ Background Image Settings</h5>
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  placeholder="Background image URL..."
                                  value={section.backgroundUrl || ''}
                                  onChange={e => updateSection(section.id, {backgroundUrl: e.target.value})}
                                  className={`w-full text-xs p-1 border rounded ${inputClass}`}
                                />
                                <div className="flex items-center gap-2">
                                  <span className="text-xs w-16">Overlay:</span>
                                  <input
                                    type="color"
                                    value={section.overlayColor || '#1f1f1f'}
                                    onChange={e => updateSection(section.id, {overlayColor: e.target.value})}
                                    className="w-6 h-6 rounded border-none"
                                  />
                                  <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={section.overlayOpacity || 60}
                                    onChange={e => updateSection(section.id, {overlayOpacity: +e.target.value})}
                                    className="flex-1"
                                  />
                                  <span className="text-xs">{section.overlayOpacity || 60}%</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs w-16">Height:</span>
                                  <input
                                    type="number"
                                    min={200}
                                    max={800}
                                    value={section.minHeight || 300}
                                    onChange={e => updateSection(section.id, {minHeight: +e.target.value})}
                                    className={`w-20 text-xs p-1 border rounded ${inputClass}`}
                                  />
                                  <span className="text-xs">px</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Stats Bars Controls */}
                          {section.type === 'stats-bars' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <div className="flex items-center justify-between">
                                <h5 className="text-sm font-medium">📊 Stats Bars ({(section.statBars || []).length})</h5>
                                <button
                                  onClick={() => {
                                    const newBars = [...(section.statBars || []), { name: 'New Stat', value: 50, maxValue: 100, color: chrome.c1 }];
                                    updateSection(section.id, {statBars: newBars});
                                  }}
                                  className={`text-xs px-2 py-1 border rounded ${inputClass} hover:bg-green-600 hover:text-white`}
                                >
                                  + Add Bar
                                </button>
                              </div>
                              {(section.statBars || []).map((bar, barIdx) => (
                                <div key={barIdx} className="border rounded p-2 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium w-8">#{barIdx + 1}</span>
                                    <button
                                      onClick={() => {
                                        const newBars = [...(section.statBars || [])];
                                        newBars.splice(barIdx, 1);
                                        updateSection(section.id, {statBars: newBars});
                                      }}
                                      className="text-xs px-1 py-1 bg-red-600 text-white rounded"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Stat name..."
                                    value={bar.name}
                                    onChange={e => {
                                      const newBars = [...(section.statBars || [])];
                                      newBars[barIdx] = {...newBars[barIdx], name: e.target.value};
                                      updateSection(section.id, {statBars: newBars});
                                    }}
                                    className={`w-full text-xs p-1 border rounded ${inputClass}`}
                                  />
                                  <div className="flex gap-1">
                                    <input
                                      type="number"
                                      placeholder="Value"
                                      min={0}
                                      value={bar.value}
                                      onChange={e => {
                                        const newBars = [...(section.statBars || [])];
                                        newBars[barIdx] = {...newBars[barIdx], value: +e.target.value};
                                        updateSection(section.id, {statBars: newBars});
                                      }}
                                      className={`flex-1 text-xs p-1 border rounded ${inputClass}`}
                                    />
                                    <input
                                      type="number"
                                      placeholder="Max"
                                      min={1}
                                      value={bar.maxValue || 100}
                                      onChange={e => {
                                        const newBars = [...(section.statBars || [])];
                                        newBars[barIdx] = {...newBars[barIdx], maxValue: +e.target.value};
                                        updateSection(section.id, {statBars: newBars});
                                      }}
                                      className={`flex-1 text-xs p-1 border rounded ${inputClass}`}
                                    />
                                    <input
                                      type="color"
                                      value={bar.color || chrome.c1}
                                      onChange={e => {
                                        const newBars = [...(section.statBars || [])];
                                        newBars[barIdx] = {...newBars[barIdx], color: e.target.value};
                                        updateSection(section.id, {statBars: newBars});
                                      }}
                                      className="w-8 h-6 rounded border-none"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Profile Card Controls */}
                          {section.type === 'profile-card' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">👤 Profile Card Settings</h5>
                              <input
                                type="text"
                                placeholder="Profile image URL..."
                                value={section.profileImage || ''}
                                onChange={e => updateSection(section.id, {profileImage: e.target.value})}
                                className={`w-full text-xs p-1 border rounded ${inputClass}`}
                              />
                              <textarea
                                rows={2}
                                placeholder="Badges (comma-separated)..."
                                value={(section.profileBadges || []).join(', ')}
                                onChange={e => updateSection(section.id, {profileBadges: e.target.value.split(',').map(b => b.trim()).filter(b => b)})}
                                className={`w-full text-xs p-1 border rounded ${inputClass}`}
                              />
                            </div>
                          )}

                          {/* Feature Grid Controls */}
                          {section.type === 'feature-grid' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <div className="flex items-center justify-between">
                                <h5 className="text-sm font-medium">🎯 Feature Grid ({(section.features || []).length})</h5>
                                <button
                                  onClick={() => {
                                    const newFeatures = [...(section.features || []), { icon: '🆕', title: 'New Feature', description: 'Feature description...' }];
                                    updateSection(section.id, {features: newFeatures});
                                  }}
                                  className={`text-xs px-2 py-1 border rounded ${inputClass} hover:bg-green-600 hover:text-white`}
                                >
                                  + Add Feature
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Columns:</span>
                                <select
                                  value={section.gridColumns || 2}
                                  onChange={e => updateSection(section.id, {gridColumns: +e.target.value})}
                                  className={`text-xs p-1 border rounded ${inputClass}`}
                                >
                                  <option value={1}>1</option>
                                  <option value={2}>2</option>
                                  <option value={3}>3</option>
                                  <option value={4}>4</option>
                                </select>
                              </div>
                              {(section.features || []).map((feature, featureIdx) => (
                                <div key={featureIdx} className="border rounded p-2 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium w-8">#{featureIdx + 1}</span>
                                    <button
                                      onClick={() => {
                                        const newFeatures = [...(section.features || [])];
                                        newFeatures.splice(featureIdx, 1);
                                        updateSection(section.id, {features: newFeatures});
                                      }}
                                      className="text-xs px-1 py-1 bg-red-600 text-white rounded"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                  <div className="flex gap-1">
                                    <input
                                      type="text"
                                      placeholder="🆕"
                                      maxLength={4}
                                      value={feature.icon || ''}
                                      onChange={e => {
                                        const newFeatures = [...(section.features || [])];
                                        newFeatures[featureIdx] = {...newFeatures[featureIdx], icon: e.target.value};
                                        updateSection(section.id, {features: newFeatures});
                                      }}
                                      className={`w-12 text-xs p-1 border rounded ${inputClass}`}
                                    />
                                    <input
                                      type="text"
                                      placeholder="Feature title..."
                                      value={feature.title || ''}
                                      onChange={e => {
                                        const newFeatures = [...(section.features || [])];
                                        newFeatures[featureIdx] = {...newFeatures[featureIdx], title: e.target.value};
                                        updateSection(section.id, {features: newFeatures});
                                      }}
                                      className={`flex-1 text-xs p-1 border rounded ${inputClass}`}
                                    />
                                  </div>
                                  <textarea
                                    rows={2}
                                    placeholder="Feature description..."
                                    value={feature.description || ''}
                                    onChange={e => {
                                      const newFeatures = [...(section.features || [])];
                                      newFeatures[featureIdx] = {...newFeatures[featureIdx], description: e.target.value};
                                      updateSection(section.id, {features: newFeatures});
                                    }}
                                    className={`w-full text-xs p-1 border rounded ${inputClass}`}
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Bubble Controls */}
                          {(section.type === 'bubble-left' || section.type === 'bubble-right') && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">💬 Bubble Settings</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Color:</span>
                                <input
                                  type="color"
                                  value={section.bubbleColor || '#007aff'}
                                  onChange={e => updateSection(section.id, {bubbleColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                              </div>
                            </div>
                          )}

                          {/* Divider Controls */}
                          {section.type === 'divider' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">📏 Divider Settings</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Color:</span>
                                <input
                                  type="color"
                                  value={section.dividerColor || chrome.c1}
                                  onChange={e => updateSection(section.id, {dividerColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                                <button
                                  onClick={() => updateSection(section.id, {dividerStyle: section.dividerStyle === 'dashed' ? 'gradient' : 'dashed'})}
                                  className={`text-xs px-2 py-1 border rounded ${inputClass}`}
                                >
                                  {section.dividerStyle === 'dashed' ? '- - Dashed' : '🌈 Gradient'}
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Quote Controls */}
                          {section.type === 'quote' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">📝 Quote Settings</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Accent Color:</span>
                                <input
                                  type="color"
                                  value={section.quoteColor || chrome.c1}
                                  onChange={e => updateSection(section.id, {quoteColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                              </div>
                            </div>
                          )}

                          {/* Callout Controls */}
                          {section.type === 'callout' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">📢 Callout Settings</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Border:</span>
                                <input
                                  type="color"
                                  value={section.calloutColor || chrome.c1}
                                  onChange={e => updateSection(section.id, {calloutColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                                <span className="text-xs">Background:</span>
                                <input
                                  type="color"
                                  value={section.calloutBgColor || chrome.c1 + '22'}
                                  onChange={e => updateSection(section.id, {calloutBgColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                              </div>
                            </div>
                          )}

                          {/* Traits Controls */}
                          {section.type === 'traits' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">🏷️ Traits Settings</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Tag Color:</span>
                                <input
                                  type="color"
                                  value={section.traitBgColor || chrome.c1}
                                  onChange={e => updateSection(section.id, {traitBgColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                              </div>
                              <p className="text-xs opacity-75">Enter traits separated by commas in the content field.</p>
                            </div>
                          )}

                          {/* Stats Controls */}
                          {section.type === 'stats' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">📊 Stats Settings</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Background:</span>
                                <input
                                  type="color"
                                  value={section.statsBgColor || 'rgba(0,0,0,0.3)'}
                                  onChange={e => updateSection(section.id, {statsBgColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                                <span className="text-xs">Accent:</span>
                                <input
                                  type="color"
                                  value={section.traitBgColor || chrome.c1}
                                  onChange={e => updateSection(section.id, {traitBgColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                              </div>
                              <input
                                type="text"
                                placeholder="Text for undefined values (default: —)"
                                value={section.statsUndefinedText || ''}
                                onChange={e => updateSection(section.id, {statsUndefinedText: e.target.value})}
                                className={`w-full text-xs p-1 border rounded ${inputClass}`}
                              />
                              <p className="text-xs opacity-75">Format: "Name: Value" (one per line)</p>
                            </div>
                          )}

                          {/* Container Controls */}
                          {section.type === 'container' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">📦 Container Settings</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Style:</span>
                                <select
                                  value={section.containerStyle || 'quote'}
                                  onChange={e => updateSection(section.id, {containerStyle: e.target.value as any})}
                                  className={`text-xs p-1 border rounded ${inputClass}`}
                                >
                                  <option value="quote">Quote</option>
                                  <option value="callout">Callout</option>
                                  <option value="box">Box</option>
                                  <option value="panel">Panel</option>
                                </select>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Border:</span>
                                <input
                                  type="color"
                                  value={section.containerColor || chrome.c1}
                                  onChange={e => updateSection(section.id, {containerColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                                <span className="text-xs">Background:</span>
                                <input
                                  type="color"
                                  value={section.containerBgColor || chrome.c1 + '22'}
                                  onChange={e => updateSection(section.id, {containerBgColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                              </div>
                            </div>
                          )}

                          {/* Group Controls */}
                          {section.type === 'group' && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <h5 className="text-sm font-medium">🏢 Group Settings</h5>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Border:</span>
                                <input
                                  type="color"
                                  value={section.groupBorderColor || chrome.cGroup}
                                  onChange={e => updateSection(section.id, {groupBorderColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Background:</span>
                                <input
                                  type="color"
                                  value={section.groupBgColor || chrome.cGroupBg}
                                  onChange={e => updateSection(section.id, {groupBgColor: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">Header BG:</span>
                                <input
                                  type="color"
                                  value={section.groupHeaderBg || chrome.cGroupBg}
                                  onChange={e => updateSection(section.id, {groupHeaderBg: e.target.value})}
                                  className="w-8 h-6 rounded border-none"
                                />
                              </div>
                            </div>
                          )}

                          {/* Image Gallery Controls */}
                          {(section.images && section.images.length > 0 || ['normal', 'heading', 'callout', 'quote', 'stats', 'traits', 'background-image', 'stats-bars', 'profile-card', 'feature-grid'].includes(section.type)) && (
                            <div className="space-y-2 p-2 bg-black/20 rounded">
                              <div className="flex items-center justify-between">
                                <h5 className="text-sm font-medium">🖼️ Image Gallery ({(section.images || []).length})</h5>
                                <button
                                  onClick={() => addImageToSection(section.id)}
                                  className={`text-xs px-2 py-1 border rounded ${inputClass} hover:bg-green-600 hover:text-white`}
                                >
                                  + Add Image
                                </button>
                              </div>
                              {(section.images || []).map((img, imgIdx) => (
                                <div key={imgIdx} className="border rounded p-2 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium w-8">#{imgIdx + 1}</span>
                                    <button
                                      onClick={() => {
                                        const newImages = [...(section.images || [])];
                                        newImages.splice(imgIdx, 1);
                                        updateSection(section.id, {images: newImages});
                                      }}
                                      className="text-xs px-1 py-1 bg-red-600 text-white rounded"
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Image URL..."
                                    value={img.url || ''}
                                    onChange={e => {
                                      const newImages = [...(section.images || [])];
                                      newImages[imgIdx] = {...newImages[imgIdx], url: e.target.value};
                                      updateSection(section.id, {images: newImages});
                                    }}
                                    className={`w-full text-xs p-1 border rounded ${inputClass}`}
                                  />
                                  <div className="flex gap-1">
                                    <input
                                      type="text"
                                      placeholder="Alt text..."
                                      value={img.alt || ''}
                                      onChange={e => {
                                        const newImages = [...(section.images || [])];
                                        newImages[imgIdx] = {...newImages[imgIdx], alt: e.target.value};
                                        updateSection(section.id, {images: newImages});
                                      }}
                                      className={`flex-1 text-xs p-1 border rounded ${inputClass}`}
                                    />
                                    <input
                                      type="text"
                                      placeholder="Caption..."
                                      value={img.caption || ''}
                                      onChange={e => {
                                        const newImages = [...(section.images || [])];
                                        newImages[imgIdx] = {...newImages[imgIdx], caption: e.target.value};
                                        updateSection(section.id, {images: newImages});
                                      }}
                                      className={`flex-1 text-xs p-1 border rounded ${inputClass}`}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addSection}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    ➕ Add Section
                  </button>
                </div>
              </>
            )}

            {tab === 'float' && (
              <>
                <h3 className="text-lg font-semibold mb-4">🎈 Floating Image</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={floating.enabled}
                      onChange={e => setFloating({...floating, enabled: e.target.checked})}
                    />
                    <span>Enable Floating Image</span>
                  </label>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                      value={floating.url}
                      onChange={e => setFloating({...floating, url: e.target.value})}
                      className={`w-full p-2 border rounded resize-x min-w-[200px] ${inputClass}`}
                      style={{ resize: 'horizontal' }}
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      onClick={() => setFloating({...floating, url: `https://picsum.photos/300/400?random=${Math.floor(Math.random() * 1000)}`})}
                      className={`mt-2 text-xs px-2 py-1 border rounded ${inputClass} hover:bg-blue-600 hover:text-white`}
                    >
                      🎲 Random Image
                    </button>
                    {floating.url && (
                      <img
                        src={floating.url}
                        alt="preview"
                        className="mt-2 max-w-24 max-h-24 border rounded"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Height % (of screen)</label>
                    <input
                      type="range"
                      min={10}
                      max={80}
                      value={floating.height}
                      onChange={e => setFloating({...floating, height: +e.target.value})}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-500">{floating.height}%</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Position</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        {value: 'top-left', label: '↖️ Top Left'},
                        {value: 'top-right', label: '↗️ Top Right'},
                        {value: 'bottom-left', label: '↙️ Bottom Left'},
                        {value: 'bottom-right', label: '↘️ Bottom Right'}
                      ].map(pos => (
                        <button
                          key={pos.value}
                          onClick={() => setFloating({...floating, pos: pos.value as any})}
                          className={`p-2 text-sm border rounded ${
                            floating.pos === pos.value 
                              ? 'bg-blue-600 text-white' 
                              : inputClass + ' hover:bg-blue-600 hover:text-white'
                          }`}
                        >
                          {pos.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {tab === 'style' && (
              <>
                <div className="mb-6">
                  <div className={`${cardClass} border rounded p-3 mb-3 cursor-pointer font-semibold sticky top-16 z-10`} style={{ backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb' }}>
                    🎨 Chrome & Colours
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={chrome.hdrEnabled}
                          onChange={e=>setChrome({...chrome, hdrEnabled: e.target.checked})}
                        />
                        <span>Enable Header</span>
                      </label>
                    </div>
                    
                    {chrome.hdrEnabled && (
                      <div className="flex items-center gap-2 mb-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={chrome.hdrOn}
                            onChange={e=>setChrome({...chrome, hdrOn: e.target.checked})}
                          />
                          <span>Header BG</span>
                        </label>
                        {colour('c1', !chrome.hdrOn)}
                        {chrome.hdrOn && colour('c2', !chrome.gradOn)}
                        {chrome.hdrOn && (
                          <label className="flex items-center gap-1 text-sm">
                            <input
                              type="checkbox"
                              checked={chrome.gradOn}
                              onChange={e=>setChrome({...chrome, gradOn: e.target.checked})}
                            />
                            <span>Gradient</span>
                          </label>
                        )}
                      </div>
                    )}
                    
                    {chrome.hdrEnabled && toggle('barOn', 'Left Bar', ['cBar'])}
                    {toggle('borderOn', 'Card Border', ['cBorder'])}
                    {toggle('bgOn', 'Body BG', ['cBg'])}
                    <div className="flex items-center gap-2 mb-2">
                      <span>Body Text</span>
                      {colour('cTxt')}
                    </div>
                  </div>
                </div>
                {/* ADD THE WIDTH SETTINGS SECTION HERE */}
    <div className="mb-6">
      <div className={`${cardClass} border rounded p-3 mb-3 cursor-pointer font-semibold sticky top-16 z-10`} style={{ backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb' }}>
        📏 Width Settings
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={chrome.longHeader}
              onChange={e=>setChrome({...chrome, longHeader: e.target.checked})}
            />
            <span>Long Header</span>
          </label>
          <span className="text-xs opacity-75">
            {chrome.longHeader ? '(1200px max)' : '(800px max)'}
          </span>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={chrome.longInside}
              onChange={e=>setChrome({...chrome, longInside: e.target.checked})}
            />
            <span>Long Inside Content</span>
          </label>
          <span className="text-xs opacity-75">
            {chrome.longInside ? '(1200px max)' : '(800px max)'}
          </span>
        </div>
      </div>
    </div>
    {/* END OF WIDTH SETTINGS SECTION */}
                <div className="mb-6">
                  <div className={`${cardClass} border rounded p-3 mb-3 cursor-pointer font-semibold sticky top-16 z-10`} style={{ backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb' }}>
                    🏢 Group Settings
                  </div>
                  <div className="space-y-3">
                    {/* Group Border */}
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={chrome.groupBorder}
                          onChange={e => setChrome({...chrome, groupBorder: e.target.checked})}
                        />
                        <span>Group Border</span>
                      </label>
                      <input
                        type="color"
                        value={chrome.cGroup}
                        onChange={e => setChrome({...chrome, cGroup: e.target.value})}
                        disabled={!chrome.groupBorder}
                        className={`w-8 h-8 rounded border-none ${!chrome.groupBorder ? 'opacity-35' : ''}`}
                      />
                    </div>

                    {/* Group Background */}
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={chrome.groupBg}
                          onChange={e => setChrome({...chrome, groupBg: e.target.checked})}
                        />
                        <span>Group Background</span>
                      </label>
                      <input
                        type="color"
                        value={chrome.cGroupBg}
                        onChange={e => setChrome({...chrome, cGroupBg: e.target.value})}
                        disabled={!chrome.groupBg}
                        className={`w-8 h-8 rounded border-none ${!chrome.groupBg ? 'opacity-35' : ''}`}
                      />
                    </div>

                    {/* Group Divider */}
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={chrome.groupDivider}
                          onChange={e => setChrome({...chrome, groupDivider: e.target.checked})}
                        />
                        <span>Group Divider</span>
                      </label>
                      <input
                        type="color"
                        value={chrome.cGroupDivider}
                        onChange={e => setChrome({...chrome, cGroupDivider: e.target.value})}
                        disabled={!chrome.groupDivider}
                        className={`w-8 h-8 rounded border-none ${!chrome.groupDivider ? 'opacity-35' : ''}`}
                      />
                      {chrome.groupDivider && (
                        <button
                          onClick={() => setChrome({...chrome, groupDividerStyle: chrome.groupDividerStyle === 'dashed' ? 'gradient' : 'dashed'})}
                          className={`text-xs px-2 py-1 border rounded ${inputClass}`}
                        >
                          {chrome.groupDividerStyle === 'dashed' ? '- - Dashed' : '🌈 Gradient'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {chrome.hdrEnabled && (
                  <div className="mb-6">
                    <div className={`${cardClass} border rounded p-3 mb-3 cursor-pointer font-semibold sticky top-16 z-10`} style={{ backgroundColor: theme === 'dark' ? '#374151' : '#f9fafb' }}>
                      ✍️ Header Font
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Family</label>
                        <select
                          value={chrome.font}
                          onChange={e => setChrome({...chrome, font: e.target.value})}
                          className={`w-full p-2 border rounded ${inputClass}`}
                        >
                          {fontOptions.map(opt => 
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Size (px)</label>
                        <input
                          type="range"
                          min={10}
                          max={64}
                          value={chrome.size}
                          onChange={e => setChrome({...chrome, size: +e.target.value})}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500">{chrome.size}px</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Stroke (px)</label>
                        <input
                          type="range"
                          min={0}
                          max={3}
                          step={0.5}
                          value={chrome.stroke}
                          onChange={e => setChrome({...chrome, stroke: +e.target.value})}
                          className="w-full"
                        />
                        <div className="text-sm text-gray-500">{chrome.stroke}px</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Stroke Colour</label>
                        {colour('strokeCol')}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Shadow Colour</label>
                        {colour('shadowCol')}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {tab === 'markup' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">📄 HTML Markup</h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(completeHtml);
                    }}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    📋 Copy HTML
                  </button>
                </div>
                <textarea
                  readOnly
                  value={completeHtml}
                  className={`w-full h-96 p-3 border rounded font-mono text-sm resize-both min-h-[200px] ${
                    theme === 'dark' 
                      ? 'bg-gray-800 border-gray-600 text-green-400' 
                      : 'bg-gray-50 border-gray-300 text-green-600'
                  }`}
                  style={{ resize: 'both' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right panel - Preview */}
        <div className={`w-1/2 p-4 overflow-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div dangerouslySetInnerHTML={{__html: previewHtml}} />
        </div>
      </div>

      {/* Load Markup Modal */}
      {showMarkupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${cardClass} border rounded-lg p-6 w-11/12 max-w-4xl max-h-[80vh] overflow-y-auto`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">📝 Load from Raw Markup. This is VERY experimental, currently ONLY JSON is fully 100% functioning, HTML import will likely cause issues.</h3>
              <button 
                onClick={() => setShowMarkupModal(false)}
                className="text-2xl hover:text-red-500"
              >
                
              </button>
            </div>
            
            <p className="text-sm opacity-75 mb-4">
              Paste your card data below to load a previous iteration:
            </p>
            <div className="text-xs mb-2 space-y-1">
              <div>📊 <strong>JSON Format:</strong> Complete card data with all settings</div>
              <div>🌐 <strong>HTML Format:</strong> Raw HTML or exported cards will be converted to editable sections</div>
              <div>🎯 <strong>Mixed Content:</strong> HTML with markdown-style headers (## Header) are supported</div>
              <div>🆕 <strong>Enhanced Support:</strong> Background images, stats bars, profile cards, and feature grids</div>
            </div>
            <textarea
              value={markupInput}
              onChange={e => setMarkupInput(e.target.value)}
              placeholder="Paste your card data here (JSON or HTML)..."
              className={`w-full h-96 p-3 border rounded font-mono text-sm resize-both min-h-[200px] ${inputClass}`}
              style={{ resize: 'both' }}
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={loadFromMarkup}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                🚀 Load Card
              </button>
              <button
                onClick={() => setShowMarkupModal(false)}
                className={`${inputClass} border rounded px-4 py-2 hover:bg-gray-200`}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardEditor;