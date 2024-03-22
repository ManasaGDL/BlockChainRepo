import PropTypes from 'prop-types';

// material-ui
import { Chip, Grid, Stack, Typography,Box } from '@mui/material';
// import CircularProgress from '@mui/material/CircularProgress';
// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, percentage, isLoss }) => (
  <MainCard contentSX={{ p: 2.25}}>
    <Stack spacing={0.5}>
      <Box sx={{ width: '100%', position: 'relative' }}>
        {/* <div style={{ height: "100%", width: '100%', position: 'relative' }}> */}
        {/* {loading && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <CircularProgress />
          </div>
        )} */}
        <Typography variant="h6" color={`'#1976d2'`}>
          {title}
        </Typography>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
          </Grid>
          {percentage && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={
                  <>
                    {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                    {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                  </>
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </Stack>

    {/* <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="textSecondary">
        You made an extra{' '}
        <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
          {extra}
        </Typography>{' '}
        this year
      </Typography>
    </Box> */}
  </MainCard>
);

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;
