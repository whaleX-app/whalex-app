const reactNavigation: any = jest.createMockFromModule('@react-navigation/native');

reactNavigation.useNavigation = jest.fn();
reactNavigation.useRoute = jest.fn().mockReturnValue({ route: jest.fn() });

module.exports = reactNavigation;
