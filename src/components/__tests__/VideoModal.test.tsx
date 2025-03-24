import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VideoModal from '../VideoModal';

describe('VideoModal', () => {
  it('renders nothing when closed', () => {
    render(
      <VideoModal
        isOpen={false}
        onClose={() => {}}
        title="Test Video"
      />
    );
    
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders modal with correct title when open', () => {
    render(
      <VideoModal
        isOpen={true}
        onClose={() => {}}
        title="Test Video"
      />
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Test Video')).toBeInTheDocument();
  });

  it('calls onClose when escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <VideoModal
        isOpen={true}
        onClose={onClose}
        title="Test Video"
      />
    );
    
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when clicking outside modal', () => {
    const onClose = vi.fn();
    render(
      <VideoModal
        isOpen={true}
        onClose={onClose}
        title="Test Video"
      />
    );
    
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalled();
  });
});