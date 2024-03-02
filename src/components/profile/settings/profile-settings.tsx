import {
  FC, useState, Dispatch, SetStateAction, useEffect,
} from 'react';

import { IUser, IRequestChangeUser } from '@interface/';
import { Button, LoadingButton } from '@shared/';
import {
  useChangeUserDataMutation,
  useSetUserAvatarMutation,
  setNewUserState,
  setIsOpenedChangingPassword,
  setIsOpnenedChangedData,
  setIsSuccess,
} from '@redux/';
import { useAppDispatch } from '@hook/';

import { SettingsInput, SettingsInputPhone } from '../ui';
import * as Styled from './profile-settings.styled';


interface IProfileSettings {
  user: IUser;
}

export const ProfileSettings: FC<IProfileSettings> = ({ user }) => {
  const dispatch = useAppDispatch();

  const [changeUser] = useChangeUserDataMutation();
  const [uploadAvatar] = useSetUserAvatarMutation();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);

  const handleChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    set: Dispatch<SetStateAction<string>>,
  ) => {
    set(event.target.value);
    setIsDisabled(false);
  };

  const handleChangeUserData = () => {
    const body: IRequestChangeUser = {
      role: 'user',
      email,
      name,
      surname,
      phone,
      city,
    };

    setIsWaiting(true);

    changeUser({ body })
      .unwrap()
      .then((data) => {
        setIsWaiting(false);
        setIsDisabled(true);

        dispatch(setNewUserState({ userState: { id: data.id, username: data.name } }));
        dispatch(setIsOpnenedChangedData({ isOpenedChangedData: true }));
        dispatch(setIsSuccess({ isSuccess: true }));
      })
      .catch(() => {
        setIsWaiting(false);

        dispatch(setIsOpnenedChangedData({ isOpenedChangedData: true }));
        dispatch(setIsSuccess({ isSuccess: false }));
      });
  };

  const handleSetAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();

      formData.append('file', file);
      uploadAvatar(formData).then((data) => {
        const userData = Object.values(data)[0];

        setAvatar(userData.avatar);
      });
    }
  };

  useEffect(() => {
    setName(user.name);
    setSurname(user.surname ?? '');
    setEmail(user.email);
    setCity(user.city);
    setPhone(user.phone);
    setAvatar(user?.avatar);

    dispatch(setNewUserState({ userState: { id: user.id, username: user.name } }));
  }, [dispatch, user]);

  return (
    <Styled.Settings>
      <Styled.SettingsTitle>Настройки профиля</Styled.SettingsTitle>
      <Styled.SettingsPictureBox>
        <Styled.SettingsPicture>
          { Boolean(avatar) && <img alt="User img" src={ `${process.env.REACT_APP_API_URL}${avatar}` } /> }
        </Styled.SettingsPicture>
        <Styled.SettingsFileInput id="upload-avatar" type="file" onChange={ handleSetAvatar } />
        <Styled.SettingsLink onClick={ (e) => {
          e.preventDefault();

          document.getElementById('upload-avatar')?.click();
        } }
        >
          Изменить
        </Styled.SettingsLink>
      </Styled.SettingsPictureBox>
      <Styled.SettingsForm>
        <Styled.SettingsFormInputBox>
          <SettingsInput
            forName="settings-input"
            name="Имя"
            type="text"
            value={ name }
            onChange={ (e) => handleChangeInput(e, setName) }
          />
          <SettingsInput
            forName="settings-input"
            name="Фамилия"
            type="text"
            value={ surname }
            onChange={ (e) => handleChangeInput(e, setSurname) }
          />
        </Styled.SettingsFormInputBox>
        <Styled.SettingsFormInputBox>
          <SettingsInput
            forName="settings-input"
            name="Город"
            type="text"
            value={ city }
            onChange={ (e) => handleChangeInput(e, setCity) }
          />
        </Styled.SettingsFormInputBox>
        <Styled.SettingsFormInputBox>
          <SettingsInputPhone
            forName="settings-input"
            name="Телефон"
            type="tel"
            value={ phone }
            onChange={ (e) => handleChangeInput(e, setPhone) }
          />
        </Styled.SettingsFormInputBox>
      </Styled.SettingsForm>
      <Styled.SettingsButtons>
        <Styled.SettingsButtonBox>
          { isWaiting ? <LoadingButton /> : (
            <Button
              disabled={ isDisabled }
              text="Сохранить"
              type="button"
              onClick={ handleChangeUserData }
            />
          ) }
        </Styled.SettingsButtonBox>
        <Styled.SettingsButtonPasswordBox>
          <Button
            text="Сменить пароль"
            type="button"
            onClick={ () => dispatch(setIsOpenedChangingPassword({ isOpenedChangingPassword: true })) }
          />
        </Styled.SettingsButtonPasswordBox>
      </Styled.SettingsButtons>
    </Styled.Settings>
  );
};
