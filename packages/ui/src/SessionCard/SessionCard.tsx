// packages/ui/src/SessionCard/SessionCard.tsx
import React from 'react';
import type { Session } from '@tt/shared';

interface SessionCardProps {
    session: Session;
    isFavorite: boolean;
    onPress: (id: string) => void;
    onToggleFavorite: (id: string) => void;
    /** Simplificado para mostrar lock en lugar de contenido */
    isLocked?: boolean;
}

export function SessionCard({
                                session,
                                isFavorite,
                                onPress,
                                onToggleFavorite,
                                isLocked = false,
                            }: SessionCardProps) {
    const levelColors: Record<Session['level'], string> = {
        beginner: '#22c55e',
        intermediate: '#f59e0b',
        advanced: '#ef4444',
    };

    return (
        <div
            onClick={() => onPress(session.id)}
            style={{ cursor: 'pointer', position: 'relative' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onPress(session.id)}
        >
            {/* Thumbnail */}
            <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden' }}>
                <img
                    src={session.thumbnailUrl}
                    alt={session.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {isLocked && (
                    <div
                        style={{
                            position: 'absolute', inset: 0,
                            background: 'rgba(0,0,0,0.5)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        <span style={{ fontSize: 32 }}>🔒</span>
                    </div>
                )}
                <span
                    style={{
                        position: 'absolute', top: 8, left: 8,
                        background: levelColors[session.level],
                        color: '#fff', fontSize: 11, fontWeight: 600,
                        padding: '2px 8px', borderRadius: 4,
                    }}
                >
          {session.level}
        </span>
                <span
                    style={{
                        position: 'absolute', bottom: 8, right: 8,
                        background: 'rgba(0,0,0,0.7)',
                        color: '#fff', fontSize: 11, padding: '2px 6px', borderRadius: 4,
                    }}
                >
          {session.durationMinutes} min
        </span>
            </div>

            {/* Info */}
            <div style={{ padding: '8px 4px' }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500 }}>{session.title}</h3>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#666' }}>{session.objective}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {session.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontSize: 10, background: '#f1f5f9',
                                    padding: '2px 6px', borderRadius: 4,
                                }}
                            >
                {tag}
              </span>
                        ))}
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onToggleFavorite(session.id); }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 4 }}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    );
}
