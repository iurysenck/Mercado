import React from 'react';

export const ShoppingCartIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

export const TrashIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 6h18"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
);

export const PlusIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

export const UndoIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12h14"/>
    <path d="m7 7-4 5 4 5"/>
  </svg>
);

export const RedoIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12H7"/>
    <path d="m17 7 4 5-4 5"/>
  </svg>
);


export const CheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 6 9 17l-5-5"/>
    </svg>
);

export const CloseIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const MoreVerticalIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

export const UploadIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export const ResetIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M21 21v-5h-5" />
  </svg>
);

export const ListBulletIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 9.75A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75ZM2 14.75a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
    </svg>
);

export const SearchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
    </svg>
);

export const EditIcon: React.FC<{className?: string}> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
</svg>
);

export const BroomIcon: React.FC<{className?: string}> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path fillRule="evenodd" d="M3.5 2.116a.5.5 0 0 1 .521-.498l2.978.372a.5.5 0 0 1 .423.498v4.368c0 .276.224.5.5.5h4.368a.5.5 0 0 1 .498.423l.372 2.978a.5.5 0 0 1-.498.521l-2.978-.372a.5.5 0 0 1-.423-.498V6.132a.5.5 0 0 1-.5-.5H3.132a.5.5 0 0 1-.498-.423L2.262 3.23a.5.5 0 0 1 .521-.498l.372-2.978A.5.5 0 0 1 3.5 2.116Zm2.17 8.295a.75.75 0 0 1 .966-.33l5.433 2.264a.75.75 0 0 1 .33.966l-2.264 5.433a.75.75 0 0 1-.966.33l-5.433-2.264a.75.75 0 0 1-.33-.966l2.264-5.433Z" clipRule="evenodd" />
</svg>
);

export const DragHandleIcon: React.FC<{className?: string}> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="1" transform="rotate(90 12 5)"/>
    <circle cx="12" cy="12" r="1" transform="rotate(90 12 12)"/>
    <circle cx="12" cy="19" r="1" transform="rotate(90 12 19)"/>
    <circle cx="5" cy="5" r="1" transform="rotate(90 5 5)"/>
    <circle cx="5" cy="12" r="1" transform="rotate(90 5 12)"/>
    <circle cx="5" cy="19" r="1" transform="rotate(90 5 19)"/>
</svg>
);

export const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

export const ArrowLeftCircleIcon: React.FC<{className?: string}> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8l-4 4 4 4"/>
    <path d="M16 12H8"/>
</svg>
);

export const PasteIcon: React.FC<{className?: string}> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path d="M14.5,2H8.5C7.673,2,7,2.673,7,3.5v1H5.5C4.673,4.5,4,5.173,4,6v10.5c0,0.827,0.673,1.5,1.5,1.5h6c0.827,0,1.5-0.673,1.5-1.5V17h1.5c0.827,0,1.5-0.673,1.5-1.5V3.5C16,2.673,15.327,2,14.5,2z M12,12.5H8.5c-0.275,0-0.5-0.225-0.5-0.5s0.225-0.5,0.5-0.5H12c0.275,0,0.5,0.225,0.5,0.5S12.275,12.5,12,12.5z M13.5,9.5H8.5C8.225,9.5,8,9.275,8,9s0.225-0.5,0.5-0.5h5c0.275,0,0.5,0.225,0.5,0.5S13.775,9.5,13.5,9.5z M13.5,6.5H8.5C8.225,6.5,8,6.275,8,6s0.225-0.5,0.5-0.5h5c0.275,0,0.5,0.225,0.5,0.5S13.775,6.5,13.5,6.5z" />
</svg>
);

export const ShareIcon: React.FC<{className?: string}> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path d="M13 4.5a2.5 2.5 0 1 1 .702 4.243l-2.925 1.462a2.5 2.5 0 1 1-.31-1.928l2.925-1.462A2.5 2.5 0 0 1 13 4.5ZM4.5 10a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM13 15.5a2.5 2.5 0 1 1 .702-4.243l-2.925-1.462a2.5 2.5 0 1 1-.31 1.928l2.925 1.462A2.5 2.5 0 0 1 13 15.5Z" />
</svg>
);

export const WhatsAppIcon: React.FC<{className?: string}> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.74.45 3.39 1.22 4.84l-1.28 4.68 4.8-1.26c1.41.72 3.01 1.14 4.67 1.14h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zM9.91 17.38c-.46 0-.91-.12-1.32-.36l-3.3 1.09 1.12-3.21c-.34-.48-.55-.99-.55-1.55 0-2.31 1.88-4.19 4.19-4.19.98 0 1.88.39 2.54 1.05.66.66 1.05 1.56 1.05 2.54 0 2.31-1.88 4.19-4.19 4.19zm3.52-4.19c-.2-.1-.83-.41-1.02-.46-.19-.05-.33-.08-.46.08-.13.16-.38.46-.46.55-.08.09-.16.1-.29.02s-.53-.2-.99-.6c-.36-.31-.6-.69-.67-.81-.07-.12 0-.19.06-.25s.16-.19.24-.28c.08-.09.1-.12.16-.21s.03-.16-.01-.25c-.04-.09-.46-1.1-.63-1.5-.16-.39-.33-.33-.46-.33h-.42c-.13 0-.33.05-.5.25-.17.2-.63.62-.63 1.51 0 .89.65 1.75.74 1.88.09.13 1.25 1.91 3.03 2.68.43.18.76.29 1.03.37.5.15.96.13 1.32.08.4-.05 1.25-.51 1.42-1 .17-.49.17-.91.12-1s-.16-.15-.36-.25z"></path>
</svg>
);

export const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h5A1.5 1.5 0 0 1 15 3.5v5A1.5 1.5 0 0 1 13.5 10h-5A1.5 1.5 0 0 1 7 8.5v-5Z" />
  <path d="M5 6.5A1.5 1.5 0 0 0 3.5 8v5A1.5 1.5 0 0 0 5 14.5h5a1.5 1.5 0 0 0 1.5-1.5v-1A.75.75 0 0 1 12.25 11v1a.75.75 0 0 1-.75.75h-5a.75.75 0 0 1-.75-.75v-5a.75.75 0 0 1 .75-.75h1A.75.75 0 0 1 8 5.75v-1A1.5 1.5 0 0 0 6.5 5h-1.5Z" />
</svg>
);

export const ArrowUturnLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path fillRule="evenodd" d="M12.5 3.25a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V7.31L7.22 11.8a.75.75 0 0 1-1.06-1.06l4.53-4.53H7.5a.75.75 0 0 1 0-1.5h5Z" clipRule="evenodd" />
  <path fillRule="evenodd" d="M3.25 9a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5H4a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-5.5a.75.75 0 0 1 1.5 0v5.5A1.75 1.75 0 0 1 11.5 18h-7.5A1.75 1.75 0 0 1 2.25 16.25v-7.5c0-.966.784-1.75 1.75-1.75Z" clipRule="evenodd" />
</svg>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
</svg>
);

export const ExclamationTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path fillRule="evenodd" d="M8.485 2.5c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.5zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
</svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
</svg>
);

export const CogIcon: React.FC<{ className?: string }> = ({ className }) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
  <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.93 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
</svg>
);