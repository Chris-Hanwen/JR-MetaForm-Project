import React from 'react';

import {
    Checkbox,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

import { IFetchedOption, IFetchedQuestion } from '@/interfaces/CreateResponse';
import ImageContainer from '@/layouts/ImageContainer';

const CheckboxList = ({
    question,
    setSelected,
    selected,
}: {
    question: IFetchedQuestion;
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>> | ((selected: string[]) => void);
}) => {
    const { options } = question;

    const handleToggle = (toggledOption: IFetchedOption) => () => {
        const { _id: optionId } = toggledOption;
        const currentIndex = selected.indexOf(optionId);
        const newChecked = [...selected];
        if (currentIndex === -1) {
            newChecked.push(optionId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setSelected(newChecked);
    };
    return (
        <List dense>
            {options.map((option) => {
                const labelId = `checkbox-list-label-${option._id}`;
                return (
                    <>
                        <ListItem key={option.id}>
                            <ListItemButton role={undefined} onClick={handleToggle(option)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selected.indexOf(option._id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${option.value}`} />
                            </ListItemButton>
                        </ListItem>
                        {option.image && <ImageContainer large={false} image={option.image} />}
                    </>
                );
            })}
        </List>
    );
};

export default CheckboxList;
