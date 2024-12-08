import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions } from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpened, setIsOpened] = useState(false);

	const [fontFamilyOption, setFontFamilyOption] = useState(props.articleState.fontFamilyOption);
	const [fontColor, setFontColor] = useState(props.articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(props.articleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(props.articleState.contentWidth);
	const [fontSizeOption, setFontSizeOption] = useState(props.articleState.fontSizeOption);

	const toggleOpen = () => {
		setIsOpened(prev => !prev)
	};

	const handleOverlayClick = () => {
		setIsOpened(false);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		props.setArticleState({
			...props.articleState,
			fontFamilyOption,
			fontColor,
			backgroundColor,
			contentWidth,
			fontSizeOption,
		});
	};

	const handleReset = () => {
		props.setArticleState(defaultArticleState),
		setFontFamilyOption(defaultArticleState.fontFamilyOption),
		setFontColor(defaultArticleState.fontColor),
		setBackgroundColor(defaultArticleState.backgroundColor),
		setContentWidth(defaultArticleState.contentWidth),
		setFontSizeOption(defaultArticleState.fontSizeOption)
	};

	return (
		<>
			<ArrowButton isOpen={isOpened} onClick={toggleOpen} />
			<div className={clsx(styles.overlay, isOpened && styles.overlay_open)} onClick={handleOverlayClick}>

			</div>
			<aside className={clsx(styles.container, isOpened && styles.open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={setFontFamilyOption}
					/>
					<RadioGroup
						name='fontSize'
						selected={fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
						onChange={setFontSizeOption}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={setBackgroundColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='цвет фона'
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' onClick={handleReset}/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
