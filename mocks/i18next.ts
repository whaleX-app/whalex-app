const i18next: any = jest.createMockFromModule('i18next');

i18next.use = () => i18next;
i18next.init = jest.fn();

export default i18next;
