```
type CustomBreadcrumbsProps = {
  pageName: string;
  subPageName?: string;
};
```

```
type BreadcrumbItem = {
  title: JSX.Element | string; // Can be HTML tag | string
  href?: string;              
};

interface ChildProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}


#ٌ Way 1
const DeleteServicesBookingButton = ({ id }: { id: number }) => {
--------------------------------
# Way 2
import { FC, ReactNode } from 'react';

interface BaseModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: string | number;
  title: string;
  withCloseButton: boolean;
}

const BaseModal: FC<BaseModalProps> = ({
  opened,
  onClose,
  children,
  size = 1016,
  title,
  ...restOfProps
}) => (
  <Modal
    opened={opened}
    onClose={onClose}
    title={title}
    size={size}
    centered
    {...restOfProps}
  >
    {children}
  </Modal>
);

export default BaseModal;

```
