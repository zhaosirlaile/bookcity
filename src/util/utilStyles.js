import {DEFAULT_COLOR} from './utilParams';

export default {
  wrap: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    backgroundColor: DEFAULT_COLOR,
    flexDirection: 'row',
  },
  headerLeft: {
    flexDirection: 'row',
    width: 25,
    alignItems: 'center',
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenterText: {
    fontSize: 18,
  },
  headerRight: {
    flexDirection: 'row',
    width: 25,
    alignItems: 'center',
    marginRight: 15,
    justifyContent: 'space-between',
  },
  headerColor: {
    color: '#fff',
  },
  body: {
    flex: 1,
    // backgroundColor: '#f0f0f0',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};
