import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../store/authStore";
import { COLORS } from "../utils/constants";

const { width, height } = Dimensions.get("window");

/* ----------Goutte qui tombe de la burette---------- */
interface DropProps {
  delay: number;
}

const Drop: React.FC<DropProps> = ({ delay }) => {
  const animY = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animY, {
          toValue: 120,
          duration: 1000,
          delay,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(animOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(animOpacity, {
            toValue: 0,
            duration: 100,
            delay: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.drop,
        {
          transform: [{ translateY: animY }],
          opacity: animOpacity,
        },
      ]}
    />
  );
};

/*----------Bulle dans le bécher---------*/
interface BubbleProps {
  delay: number;
  x: number;
}

const Bubble: React.FC<BubbleProps> = ({ delay, x }) => {
  const animY = useRef(new Animated.Value(0)).current;
  const animOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.timing(animY, {
          toValue: -100,
          duration: 2500,
          delay,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(animOpacity, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(animOpacity, {
            toValue: 0,
            duration: 300,
            delay: 1900,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          left: x,
          transform: [{ translateY: animY }],
          opacity: animOpacity,
        },
      ]}
    />
  );
};

/*----------Molécule NaCl Stylée---------*/
const MoleculeIcon: React.FC = () => {
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float1, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(float1, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float2, {
          toValue: 8,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(float2, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 15000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[styles.moleculeContainer, { transform: [{ rotate }] }]}
    >
      <Animated.View
        style={[styles.atomNa, { transform: [{ translateY: float1 }] }]}
      >
        <Text style={styles.atomTextNa}>Na</Text>
        <View style={styles.electronCloudNa} />
      </Animated.View>

      <View style={styles.ionicBond} />

      <Animated.View
        style={[styles.atomCl, { transform: [{ translateY: float2 }] }]}
      >
        <Text style={styles.atomTextCl}>Cl</Text>
        <View style={styles.electronCloudCl} />
      </Animated.View>

      <View style={styles.orbitParticle1} />
      <View style={styles.orbitParticle2} />
      <View style={styles.orbitParticle3} />
    </Animated.View>
  );
};

/*----------Splash Screen---------*/
const SplashScreen: React.FC = () => {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const buretteLevel = useRef(new Animated.Value(1)).current;
  const beakerLevel = useRef(new Animated.Value(0)).current;
  const labOpacity = useRef(new Animated.Value(1)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.5)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0.3)).current;
  const sheetSlide = useRef(new Animated.Value(height * 0.4)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(buretteLevel, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: false,
        }),
        Animated.timing(beakerLevel, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: false,
        }),
      ]),

      Animated.delay(300),
      Animated.timing(labOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),

      Animated.parallel([
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(iconScale, {
          toValue: 1,
          tension: 40,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(titleScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),

      Animated.delay(400),
      Animated.spring(sheetSlide, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const buretteLiquidHeight = buretteLevel.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 160],
  });

  const beakerLiquidHeight = beakerLevel.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 140],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dosageSetup, { opacity: labOpacity }]}>
        <View style={styles.buretteContainer}>
          <View style={styles.buretteTop}>
            <View style={styles.tap} />
          </View>

          <View style={styles.burette}>
            <View style={[styles.buretteGrad, { top: 20 }]}>
              <Text style={styles.gradText}>0</Text>
              <View style={styles.gradLine} />
            </View>
            <View style={[styles.buretteGrad, { top: 60 }]}>
              <Text style={styles.gradText}>10</Text>
              <View style={styles.gradLine} />
            </View>
            <View style={[styles.buretteGrad, { top: 100 }]}>
              <Text style={styles.gradText}>20</Text>
              <View style={styles.gradLine} />
            </View>
            <View style={[styles.buretteGrad, { top: 140 }]}>
              <Text style={styles.gradText}>30</Text>
              <View style={styles.gradLine} />
            </View>

            <Animated.View
              style={[styles.buretteLiquid, { height: buretteLiquidHeight }]}
            />
          </View>

          <View style={styles.buretteTip}>
            <Drop delay={0} />
            <Drop delay={500} />
          </View>
        </View>

        <View style={styles.beakerContainer}>
          <View style={styles.beaker}>
            <View style={[styles.beakerGrad, { bottom: 110 }]}>
              <View style={styles.gradLineBeaker} />
              <Text style={styles.gradTextBeaker}>150ml</Text>
            </View>
            <View style={[styles.beakerGrad, { bottom: 70 }]}>
              <View style={styles.gradLineBeaker} />
              <Text style={styles.gradTextBeaker}>100ml</Text>
            </View>
            <View style={[styles.beakerGrad, { bottom: 30 }]}>
              <View style={styles.gradLineBeaker} />
              <Text style={styles.gradTextBeaker}>50ml</Text>
            </View>

            <Animated.View
              style={[styles.beakerLiquid, { height: beakerLiquidHeight }]}
            >
              {[...Array(6)].map((_, i) => (
                <Bubble key={i} delay={2500 + i * 400} x={15 + i * 18} />
              ))}
            </Animated.View>
          </View>
        </View>
      </Animated.View>

      <Animated.View
        style={[styles.contentContainer, { opacity: titleOpacity }]}
      >
        <Animated.View
          style={[
            styles.iconWrapper,
            {
              opacity: iconOpacity,
              transform: [{ scale: iconScale }],
            },
          ]}
        >
          <MoleculeIcon />
        </Animated.View>

        <Animated.View
          style={[
            styles.titleContainer,
            { transform: [{ scale: titleScale }] },
          ]}
        >
          <Text style={styles.title}>PhysicLearn</Text>
          <Text style={styles.subtitle}>La science à portée de main</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={[
          styles.bottomSheet,
          { transform: [{ translateY: sheetSlide }] },
        ]}
      >
        <View style={styles.sheetHandle} />

        <Text style={styles.sheetDescription}>
          Découvre les secrets de la physique avec des cours clairs et
          interactifs
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => router.push("/(auth)/register")}
            activeOpacity={0.85}
          >
            <Text style={styles.registerBtnText}>Créer un compte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => router.push("/(auth)/login")}
            activeOpacity={0.85}
          >
            <Text style={styles.loginBtnText}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },

  dosageSetup: {
    position: "absolute",
    top: height * 0.15,
    alignSelf: "center",
    alignItems: "center",
  },

  buretteContainer: {
    alignItems: "center",
    marginBottom: 15,
  },

  buretteTop: {
    width: 30,
    height: 15,
    backgroundColor: "#78909C",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  tap: {
    width: 8,
    height: 8,
    backgroundColor: "#546E7A",
    borderRadius: 4,
  },

  burette: {
    width: 30,
    height: 180,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: "#90A4AE",
    position: "relative",
    justifyContent: "flex-end",
    overflow: "hidden",
  },

  buretteLiquid: {
    width: "100%",
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: 0,
  },

  buretteGrad: {
    position: "absolute",
    left: -35,
    flexDirection: "row",
    alignItems: "center",
  },

  gradText: {
    fontSize: 11,
    color: "#546E7A",
    fontWeight: "600",
    marginRight: 5,
  },

  gradLine: {
    width: 12,
    height: 1.5,
    backgroundColor: "#78909C",
  },

  buretteTip: {
    width: 15,
    height: 25,
    backgroundColor: "#90A4AE",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: "center",
  },

  drop: {
    position: "absolute",
    top: 20,
    width: 6,
    height: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },

  beakerContainer: {
    marginTop: 10,
  },

  beaker: {
    width: 120,
    height: 160,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: "#90A4AE",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "flex-end",
    overflow: "hidden",
    position: "relative",
  },

  beakerLiquid: {
    width: "100%",
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    position: "relative",
  },

  beakerGrad: {
    position: "absolute",
    right: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  gradLineBeaker: {
    width: 15,
    height: 1.5,
    backgroundColor: "#78909C",
  },

  gradTextBeaker: {
    fontSize: 10,
    color: "#546E7A",
    fontWeight: "600",
    marginLeft: 5,
  },

  bubble: {
    position: "absolute",
    bottom: 5,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },

  contentContainer: {
    position: "absolute",
    top: height * 0.22,
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
  },

  iconWrapper: {
    marginBottom: 25,
  },

  moleculeContainer: {
    width: 140,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  atomNa: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#9C27B0",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#9C27B0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
    position: "relative",
  },

  atomTextNa: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  electronCloudNa: {
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 1.5,
    borderColor: "rgba(156, 39, 176, 0.3)",
    borderStyle: "dashed",
  },

  ionicBond: {
    width: 30,
    height: 3,
    backgroundColor: "#FFD54F",
    marginHorizontal: 5,
    borderRadius: 1.5,
  },

  atomCl: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
    position: "relative",
  },

  atomTextCl: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  electronCloudCl: {
    position: "absolute",
    width: 75,
    height: 75,
    borderRadius: 37.5,
    borderWidth: 1.5,
    borderColor: "rgba(76, 175, 80, 0.3)",
    borderStyle: "dashed",
  },

  orbitParticle1: {
    position: "absolute",
    top: -5,
    left: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#64B5F6",
  },

  orbitParticle2: {
    position: "absolute",
    bottom: -5,
    right: 20,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#81C784",
  },

  orbitParticle3: {
    position: "absolute",
    top: 45,
    left: 65,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FFD54F",
  },

  titleContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },

  title: {
    fontSize: 46,
    fontWeight: "900",
    color: COLORS.primaryDark,
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 17,
    color: "#546E7A",
    textAlign: "center",
    fontWeight: "500",
  },

  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.5,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 10,
    paddingHorizontal: 30,
    paddingBottom: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 20,
  },

  sheetHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 25,
  },

  sheetDescription: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 35,
    paddingHorizontal: 10,
  },

  buttonsContainer: {
    gap: 14,
  },

  registerBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  registerBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },

  loginBtn: {
    backgroundColor: "transparent",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#bacbe0",
  },

  loginBtnText: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "600",
  },
});
