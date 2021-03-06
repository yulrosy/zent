import getViewportSize from 'utils/dom/getViewportSize';

import createPlacement from './create';
import BottomLeft from './bottom-left';
import BottomRight from './bottom-right';
import TopLeft from './top-left';
import TopRight from './top-right';

const positionMap = {
  BottomLeft,
  BottomRight,
  TopLeft,
  TopRight,
};

function locate(
  anchorBoundingBox,
  containerBoundingBox,
  contentDimension,
  options
) {
  const viewport = getViewportSize();
  const { anchorBoundingBoxViewport, cushion } = options;

  let horizontal;
  let vertical;

  // 只有当右边放不下，并且左边能够放下的时候才移动到左边
  if (
    anchorBoundingBoxViewport.right - contentDimension.width < 0 &&
    anchorBoundingBoxViewport.left + contentDimension.width < viewport.width
  ) {
    horizontal = 'Left';
  } else {
    horizontal = 'Right';
  }

  // 只有当下面放不下，并且上面能够放下时才移动到上面
  if (
    anchorBoundingBoxViewport.bottom + cushion + contentDimension.height >
      viewport.height &&
    anchorBoundingBoxViewport.top - cushion - contentDimension.height > 0
  ) {
    vertical = 'Top';
  } else {
    vertical = 'Bottom';
  }

  const key = `${vertical}${horizontal}`;

  return positionMap[key].locate(
    anchorBoundingBox,
    containerBoundingBox,
    contentDimension,
    options
  );
}

const AutoBottomRight = createPlacement(locate);

export default AutoBottomRight;
