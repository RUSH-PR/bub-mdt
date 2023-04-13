import {
	ActionIcon,
	Group,
	Paper,
	Tooltip,
	Text,
	createStyles,
	Divider,
	Image,
	Stack,
	TextInput,
	Flex,
	ScrollArea,
	MultiSelect,
	rem,
	Box,
	CloseButton,
	Chip,
} from "@mantine/core";
import {
	IconFlag,
	IconDeviceFloppy,
	IconDeviceMobile,
	IconId,
	IconLinkOff,
	IconUser,
	IconPlus,
	IconChevronDown,
} from "@tabler/icons-react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import React from "react";

const useStyles = createStyles((theme) => ({
	action: {
		backgroundColor: theme.colors.dark[2],
		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === "dark"
					? theme.colors.dark[5]
					: theme.colors.gray[1],
		}),
	},
}));

interface ItemProps {
	value: string;
	label: string;
	backgroundcolor: string;
	onRemove(): void;
}

const content = "Place user information here...";

const ProfileInformation = () => {
	const { classes, theme } = useStyles();
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			Color,
			TextStyle,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		content,
	});

	const data = [
		{ value: "Dangerous", label: "Dangerous", backgroundcolor: "#C92A2A" },
		{ value: "Whatever", label: "Whatever", backgroundcolor: "#141517" },
	];

	function Value({ value, label, onRemove, backgroundcolor }: ItemProps) {
		const colorForBackground = backgroundcolor;
		return (
			<div>
				<Box
					sx={(theme) => ({
						display: "flex",
						cursor: "default",
						alignItems: "center",
						backgroundColor: colorForBackground,
						border: `${rem(1)} solid ${
							theme.colorScheme === "dark"
								? theme.colors.dark[7]
								: theme.colors.gray[4]
						}`,
						paddingLeft: theme.spacing.xs,
						marginLeft: 5,
						borderRadius: theme.radius.sm,
					})}
				>
					<Box sx={{ lineHeight: 1, fontSize: rem(12) }}>{label}</Box>
					<CloseButton
						onMouseDown={onRemove}
						variant='transparent'
						size={22}
						iconSize={14}
						tabIndex={-1}
					/>
				</Box>
			</div>
		);
	}

	return (
		<Paper p='md' withBorder style={{ width: 1110, height: 450 }}>
			<Group position='apart'>
				<Text weight={500}>Citizen</Text>
				<Group spacing={8} mr={0}>
					<Tooltip label='Save' withArrow color='dark' position='bottom'>
						<ActionIcon className={classes.action}>
							<IconDeviceFloppy size={16} color={theme.colors.green[6]} />
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Unlink' withArrow color='dark' position='bottom'>
						<ActionIcon className={classes.action} onClick={() => {}}>
							<IconLinkOff size={16} color={theme.colors.gray[5]} />
						</ActionIcon>
					</Tooltip>
				</Group>
			</Group>

			<Divider my='sm' />
			<Flex gap='md' justify='flex-start' direction='row' wrap='wrap'>
				<Flex gap='md' direction='row' wrap='wrap' w={630}>
					<Image
						width={260}
						height={180}
						src={"citizen[0].image"}
						alt='Placeholder for citizen picture'
						withPlaceholder
						//onClick={() => setCitizenPicture(true)}
					/>
					<Stack spacing='xs' w={350}>
						<TextInput
							icon={<IconId size={16} />}
							placeholder={"Citizen ID"}
							radius='xs'
							disabled
						/>
						<TextInput
							icon={<IconUser size={16} />}
							placeholder={`Fullname`}
							radius='xs'
							disabled
						/>
						<TextInput
							icon={<IconFlag size={16} />}
							placeholder={"Nationality"}
							radius='xs'
							disabled
						/>
						<TextInput
							icon={<IconDeviceMobile size={16} />}
							placeholder={"Phone number"}
							radius='xs'
							disabled
						/>
					</Stack>
					<RichTextEditor editor={editor}>
						<RichTextEditor.Toolbar sticky>
							<RichTextEditor.ControlsGroup>
								<RichTextEditor.Bold />
								<RichTextEditor.Italic />
								<RichTextEditor.Underline />
								<RichTextEditor.Strikethrough />
								<RichTextEditor.ClearFormatting />
								<RichTextEditor.Highlight />
							</RichTextEditor.ControlsGroup>

							<RichTextEditor.ControlsGroup>
								<RichTextEditor.Blockquote />
								<RichTextEditor.Hr />
								<RichTextEditor.BulletList />
								<RichTextEditor.OrderedList />
							</RichTextEditor.ControlsGroup>

							<RichTextEditor.ControlsGroup>
								<RichTextEditor.Link />
								<RichTextEditor.Unlink />
							</RichTextEditor.ControlsGroup>

							<RichTextEditor.ControlsGroup>
								<RichTextEditor.AlignLeft />
								<RichTextEditor.AlignCenter />
								<RichTextEditor.AlignJustify />
								<RichTextEditor.AlignRight />
							</RichTextEditor.ControlsGroup>

							<RichTextEditor.ControlsGroup>
								<RichTextEditor.ColorPicker
									colors={[
										"#25262b",
										"#868e96",
										"#fa5252",
										"#e64980",
										"#be4bdb",
										"#7950f2",
										"#4c6ef5",
										"#228be6",
										"#15aabf",
										"#12b886",
										"#40c057",
										"#82c91e",
										"#fab005",
										"#fd7e14",
									]}
								/>
							</RichTextEditor.ControlsGroup>
						</RichTextEditor.Toolbar>

						<ScrollArea style={{ height: 120, width: 625, padding: 0 }}>
							<RichTextEditor.Content style={{ lineHeight: 0.8, padding: 0 }} />
						</ScrollArea>
					</RichTextEditor>
				</Flex>
        <ScrollArea h={370}>
				  <Stack spacing='xs' w={430}>
						<MultiSelect
							data={data}
							valueComponent={Value}
							label='Tags'
							placeholder='Select tags'
							rightSection={<IconChevronDown size='1rem' />}
							rightSectionWidth={40}
							searchable
							creatable
							maxSelectedValues={8}
							getCreateLabel={(query) => `+ Create ${query}`}
							onCreate={(query) => {
								const [value, color] = query.split(":");
								const item = {
									value: value,
									label: value,
									backgroundcolor: color ? color : "#141517",
								};
								data.push(item);
								return item;
							}}
						/>
						<Group spacing={8} mr={0}>
							<Text size='md' weight={500}>
								Licenses
							</Text>
							<Tooltip
								label='Create new license'
								withArrow
								color='dark'
								position='bottom'
							>
								<ActionIcon style={{ width: 18, minWidth: 0, marginTop: 3 }}>
									<IconPlus size={16} />
								</ActionIcon>
							</Tooltip>
						</Group>

						<Group style={{ gap: 3 }}>
							<Chip defaultChecked variant='light' radius='xs' color='teal'>
								Drivers License
							</Chip>
							<Chip defaultChecked variant='light' radius='xs' color='indigo'>
								Firearms License
							</Chip>
							<Chip defaultChecked variant='light' radius='xs' color='indigo'>
								Firearms License
							</Chip>
						</Group>

						<Text size='md' weight={500}>
							Employment
						</Text>
				  </Stack>
        </ScrollArea>
			</Flex>
		</Paper>
	);
};

export default ProfileInformation;
