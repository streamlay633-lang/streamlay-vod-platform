import { LiveChannel, LiveProgram } from '../types';

export function parseM3U(m3uContent: string, startIndex = 1): LiveChannel[] {
  const lines = m3uContent.split(/\r?\n/);
  const channels: LiveChannel[] = [];
  let currentInfo: Partial<LiveChannel> = {};

  let channelNumber = startIndex;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      // Parse attributes like tvg-name, tvg-logo, group-title
      const nameMatch = line.match(/tvg-name="([^"]+)"/i);
      const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
      const groupMatch = line.match(/group-title="([^"]+)"/i);

      // Channel title after last comma
      const commaIndex = line.lastIndexOf(',');
      const rawTitle = commaIndex !== -1 ? line.substring(commaIndex + 1).trim() : '';

      const name = (nameMatch ? nameMatch[1] : rawTitle) || `Channel ${channelNumber}`;
      const logo = logoMatch ? logoMatch[1] : '';
      const group = groupMatch ? groupMatch[1] : 'Algeria';

      currentInfo = {
        id: `m3u-${Date.now()}-${channelNumber}`,
        number: channelNumber,
        name,
        logo,
        groupTitle: group,
        category: group || 'Algeria',
      };
    } else if (!line.startsWith('#') && (line.startsWith('http://') || line.startsWith('https://') || line.endsWith('.m3u8') || line.endsWith('.ts'))) {
      const streamUrl = line;
      const channelName = currentInfo.name || `Live Stream ${channelNumber}`;
      const groupTitle = currentInfo.groupTitle || 'Live';

      // Infer category from group or name
      let category = groupTitle;
      const lower = (channelName + ' ' + groupTitle).toLowerCase();
      if (lower.includes('news') || lower.includes('al24') || lower.includes('cna')) {
        category = 'News';
      } else if (lower.includes('sport') || lower.includes('heddaf') || lower.includes('foot')) {
        category = 'Sports';
      } else if (lower.includes('kid') || lower.includes('yazid') || lower.includes('toon') || lower.includes('child')) {
        category = 'Kids';
      } else if (lower.includes('music')) {
        category = 'Music';
      } else if (lower.includes('movie') || lower.includes('cinema')) {
        category = 'Movies';
      }

      const currentProgram: LiveProgram = {
        id: `prg-${Date.now()}-${channelNumber}`,
        title: `${channelName} Live Transmission`,
        startTime: '19:00',
        endTime: '21:00',
        durationMinutes: 120,
        description: `24/7 continuous high-definition live satellite & digital terrestrial stream broadcast from ${groupTitle}.`,
        rating: 'TV-PG',
        category: category,
      };

      const upcomingPrograms: LiveProgram[] = [
        {
          id: `prg-up-1-${channelNumber}`,
          title: `Evening Highlights & Special Coverage`,
          startTime: '21:00',
          endTime: '22:30',
          durationMinutes: 90,
          description: `Analysis, live reports, and audience segments.`,
          rating: 'TV-PG',
          category: category,
        },
        {
          id: `prg-up-2-${channelNumber}`,
          title: `Late Night Broadcast Feed`,
          startTime: '22:30',
          endTime: '00:00',
          durationMinutes: 90,
          description: `Nightly news roundup, sports reviews, and scheduled rebroadcasts.`,
          rating: 'TV-G',
          category: category,
        }
      ];

      channels.push({
        id: currentInfo.id || `m3u-${channelNumber}`,
        number: channelNumber,
        name: channelName,
        category: category,
        groupTitle: groupTitle,
        country: 'Algeria',
        logo: currentInfo.logo || '📺',
        badge: 'LIVE HLS',
        viewers: `${Math.floor(Math.random() * 300 + 120)}K watching`,
        streamUrl,
        previewImage: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1200&auto=format&fit=crop&q=80',
        currentProgram,
        upcomingPrograms,
      });

      channelNumber++;
      currentInfo = {};
    }
  }

  return channels;
}
