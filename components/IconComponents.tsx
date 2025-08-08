
import React from 'react';
import {
    ShoppingCart, Trash2, Plus, Minus, Undo2, Redo2, Check, X, MoreVertical, Upload, RotateCw,
    List, Search, FilePenLine, GripVertical, CheckCircle2, ArrowLeftCircle, ClipboardPaste,
    Share2, Copy, CornerUpLeft, ChevronDown, MoreHorizontal, ListPlus, CircleDollarSign,
    BadgeCheck, Lamp, Wheat, Cylinder, Salad, Beef, Milk, ShowerHead, SprayCan, Croissant,
    GlassWater, Blocks, Package, Sparkles, Slice, ChevronLeft, ChevronRight, Palette, Github, Settings,
    AlertTriangle, Info
} from 'lucide-react';

export const ShoppingCartIcon = ShoppingCart;
export const TrashIcon = Trash2;
export const PlusIcon = Plus;
export const MinusIcon = Minus;
export const UndoIcon = Undo2;
export const RedoIcon = Redo2;
export const CheckIcon = Check;
export const CloseIcon = X;
export const MoreVerticalIcon = MoreVertical;
export const UploadIcon = Upload;
export const ResetIcon = RotateCw;
export const ListBulletIcon = List;
export const SearchIcon = Search;
export const EditIcon = FilePenLine;
export const BroomIcon = Sparkles; 
export const DragHandleIcon = GripVertical;
export const CheckCircleIcon = CheckCircle2;
export const ArrowLeftCircleIcon = ArrowLeftCircle;
export const PasteIcon = ClipboardPaste;
export const ShareIcon = Share2;
export const CopyIcon = Copy;
export const ArrowUturnLeftIcon = CornerUpLeft; 
export const ChevronDownIcon = ChevronDown;
export const EllipsisHorizontalIcon = MoreHorizontal;
export const ListPlusIcon = ListPlus;
export const CashIcon = CircleDollarSign;
export const CheckBadgeIcon = BadgeCheck;
export const LampIcon = Lamp;
export const ChevronLeftIcon = ChevronLeft;
export const ChevronRightIcon = ChevronRight;
export const PaletteIcon = Palette;
export const GithubIcon = Github;
export const SettingsIcon = Settings;
export const AlertTriangleIcon = AlertTriangle;
export const InfoIcon = Info;

export const WhatsAppIcon: React.FC<{ className?: string }> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.271.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
  </svg>
);


// Default Category mapping
const defaultCategoryIcons: Record<string, React.ComponentType<{className?: string}>> = {
  'BÁSICO': Lamp,
  'CEREAIS': Wheat,
  'ENLATADOS': Cylinder,
  'CONDIMENTOS': Salad,
  'FRIOS': Slice,
  'LATICÍNIOS': Milk,
  'HIGIENE': ShowerHead,
  'LIMPEZA': SprayCan,
  'PADARIA': Croissant,
  'CARNES': Beef,
  'BEBIDAS': GlassWater,
  'OUTROS': Blocks,
};

export const getCategoryIcon = (category: string | null): React.ComponentType<{className?: string}> => {
    if (category && defaultCategoryIcons[category]) {
        return defaultCategoryIcons[category];
    }
    return Package; // Default icon for custom or null categories
};