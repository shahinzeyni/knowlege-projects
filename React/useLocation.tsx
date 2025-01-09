export const menuItems = [
  {
    icon: CalenderZoomIcon,
    label: 'Appointments',
    href: '/appointments',
    component: <AppointmentsButton />,
  },
  { icon: ListTimerIcon, label: 'Booking list', href: '/booking-list', component: null },
  {
    icon: UsersListIcon,
    label: 'Customer List',
    href: '/customer-list',
    component: <CustomerListButton />,
  },
  { icon: ShapesIcon, label: 'Services', href: '/services', component: null },
  { icon: AvailableListIcon, label: 'Available', href: '/available', component: null },
  { icon: ReportsBoardIcon, label: 'Reports', href: '/reports', component: null },
  { icon: ListTimerIcon, label: 'Shifts', href: '/shifts', component: null },
  { icon: UsersZoomIcon, label: 'Staffs', href: '/staffs', component: null },
  { icon: SettingIcon, label: 'Setting', href: '/setting', component: null },
];


const location = useLocation();
  const RenderComponent = menuItems.find((item) => location.pathname === item.href)?.component;
  const RenderNamePage = menuItems.find((item) => location.pathname === item.href)?.label;



