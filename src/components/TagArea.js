import React, { useState } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const TagArea = ({ tags, handleDelete, handleAddition, handleDrag, handleTagClick }) => {
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  return (<div style={{ width: '100%', height: '100px' }}>
    <ReactTags
      tags={tags}
      suggestions={[]}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      handleTagClick={handleTagClick}
      inputFieldPosition="bottom"
      autocomplete
      autofocus={false}
    />
  </div>
  )
}

export default TagArea
