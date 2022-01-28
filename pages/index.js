import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import { useState } from "react";
import { useRouter } from "next/router";
import appConfig from "../config.json";

function Title(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function PaginaInicial() {
  const [username, setUsername] = useState("suxport");
  const [name, setRealName] = useState("Alexys Santiago");
  const [image, setImage] = useState(`https://github.com/${username}.png`);
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[0],
          backgroundImage:
            "url(https://www.pixelstalk.net/wp-content/uploads/2016/05/Free-Dota-2-Backgrounds-Free-Download.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Alguém submeteu o form");
              roteamento.push("/chat");
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={async (e) => {
                // Onde está o valor?
                const valor = e.target.value;

                // Trocar o valor da variável
                // através do React e avise quem precisa
                setImage(`https://github.com/${valor}.png`);
                setUsername(valor);

                // Quantidade máxima de requisições por hora: 60
                const url = `https://api.github.com/users/${valor}`;
                const response = await fetch(url);

                if (response.status === 200) {
                  const data = await response.json();

                  setRealName(data.name);
                } else {
                  console.log("Usuário não encontrado na API do GitHub");

                  setRealName("#imersao-alura #aluracord");
                }
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.customs["Dark Sienna"],
                  mainColorHighlight:
                    appConfig.theme.colors.customs["Palatinate Purple"],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.customs["Han Blue"],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong:
                  appConfig.theme.colors.customs["Cornflower Blue"],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[900],
              border: "1px solid",
              borderColor: appConfig.theme.colors.customs["Dark Sienna"],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            {username.length > 2 && (
              <Image
                styleSheet={{
                  borderRadius: "50%",
                  marginBottom: "16px",
                }}
                src={image}
                onError={(e) => {
                  e.currentTarget.src = appConfig.stickers[28];
                }}
              />
            )}
            {username.length > 2 && (
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: "3px 10px",
                  borderRadius: "1000px",
                }}
              >
                {username}
              </Text>
            )}
            {username.length > 2 && (
              <Text
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  margin: "5px 0px",
                  textAlign: "center",
                }}
              >
                <a href={`https://github.com/{username}`} target="_blank">
                  {name}
                </a>
              </Text>
            )}
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
